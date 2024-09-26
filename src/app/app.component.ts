import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VvcInteractionService, Dimension, UiState} from '@vivocha/client-interaction-core';
import { Message } from '@vivocha/client-interaction-core/lib/store/models.interface';
import {ChatAreaComponent} from '@vivocha/client-interaction-layout';
import { TemplateGenericComponent } from '@vivocha/client-interaction-layout/lib/messages/template-generic/template-generic.component';
import { MessageQuickReply } from '@vivocha/public-entities';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

interface Dimensions {
  [key: string]: Dimension;
}

@Component({
  selector: 'vvc-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild(ChatAreaComponent, {static: false}) chat: ChatAreaComponent;

  public messages: Array<any>;
  public disableMessageGrouping: boolean = window['VVC_VAR_ASSETS']['showAgentAvatarInAllMessages'];
  public showQuickRepliesAsBalloon: boolean = window['VVC_VAR_ASSETS']['showQuickRepliesAsBalloon'];
  public quickRepliesNoInteractionMode = window['VVC_VAR_ASSETS']['quickRepliesBehaviour'];
  public hideQuickRepliesBodyWhenEmpty = window['VVC_VAR_ASSETS']['hideQuickRepliesBodyWhenEmpty'];
  public appState$: Observable<UiState>;

  public closeModalVisible = false;
  public surveyVisible = false;

  private isMobile;

  private dimensions: Dimensions = {
    fullscreen: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0'
    },
    minimized: {
      position: 'fixed',
      width: '80px',
      height: '80px',
      right   : window['VVC_VAR_ASSETS']['minimizedRight'],
      bottom  : window['VVC_VAR_ASSETS']['minimizedBottom']
    },
    minimizedCbn: {
      position: 'fixed',
      width: window['VVC_VAR_ASSETS']['initialWidth'],
      height: '45px',
      right: '40px',
      bottom: '0px'
      // right   : window['VVC_VAR_ASSETS']['initialRight'],
      // bottom  : window['VVC_VAR_ASSETS']['initialBottom']
    },
    minimizedCbnMobile: {
      position: 'fixed',
      width: '100%',
      height: '45px',
      left: '0',
      right: '0',
      bottom: '0'
      // right   : window['VVC_VAR_ASSETS']['initialRight'],
      // bottom  : window['VVC_VAR_ASSETS']['initialBottom']
    },
    normal: {
      position: 'fixed',
      width: window['VVC_VAR_ASSETS']['initialWidth'],
      height: window['VVC_VAR_ASSETS']['initialHeight'],
      // right: '40px',
      // bottom: '-10px'
      right   : window['VVC_VAR_ASSETS']['initialRight'],
      bottom  : window['VVC_VAR_ASSETS']['initialBottom']
    },
    custom: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0'
    },
    embedded: {
      position: 'relative',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      width: '100%',
      height: window['VVC_VAR_ASSETS']['initialHeight']
    }
  };

  private appUiStateSub: Subscription;

  public closeDimensions: Dimension;

  public selector: string | null = null;

  public agent: any = {}; // Set agent details when using Rocket.Chat.
  public uploadIcon: boolean = false; // Set the upload icon visibility, default to `false`.
  public hideTopControls: boolean = false; // Set the top controls visibility, default to `false`.
  public hideTextInput: boolean = false; // Remove the quick reply input when `true`, default to `false`.

  constructor(private interactionService: VvcInteractionService) {}

  ngOnInit() {
    this.appState$ = this.interactionService.getState();
    this.interactionService.init().subscribe(context => this.setInitialDimensions(context));
    this.interactionService.events().subscribe(evt => this.listenForEvents(evt));
    this.registerCustomActions(); // Register custom actions provided by either a bot or an interaction script.
    this.toggleTopControlsVisibility(); // Toggle top controls visibility via postMessage from the `contact-create` event.

    // listen to uiState changes in order to update the local reference used in services
    this.appUiStateSub = this.appState$.subscribe(uiState => {
      this.interactionService.setUiState(uiState);
    });
  }
  ngOnDestroy() {
    this.appUiStateSub.unsubscribe();
  }
  acceptAgentRequest(requestId) {
    this.interactionService.acceptAgentRequest(requestId);
  }
  acceptOffer() {
    this.interactionService.acceptOffer();
  }
  addChatToFullScreen(show) {
    this.interactionService.addChatToFullScreen(show);
  }
  appendText(text) {
    this.chat.appendText(text);
  }
  askForVideoUpgrade() {
    this.interactionService.askForVideoUpgrade();
  }
  askForVoiceUpgrade() {
    this.interactionService.askForVoiceUpgrade();
  }
  closeApp() {
    this.interactionService.closeApp();
    sessionStorage.removeItem('agent'); // Remove the active agent details on app close.
  }
  closeCbn() {
    this.interactionService.closeContact(this.closeDimensions);
    this.closeApp();
  }
  closeInbound() {
    this.interactionService.closeContact(this.closeDimensions);
    this.closeApp();
  }
  closeContact(context) {
    const step = this.getCloseStep(context);
    this.interactionService.track('close-contact', step);
    // console.log('CLOSE CONTACT', step, context.variables, context);
    this.trackMinizedStatus(false);
    switch (step) {
      case 'remove-app':
        this.closeApp();
        break;
      case 'show-survey':
        this.surveyVisible = true;
        this.interactionService.showSurvey();
        break;
      case 'close-and-survey':
        this.surveyVisible = true;
        this.interactionService.closeContact(this.closeDimensions);
        this.interactionService.showSurvey();
        break;
      case 'show-close-modal':
        this.closeModalVisible = true;
        this.interactionService.showCloseModal();
        break;
      case 'close-and-stay':
        this.dismissCloseModal();
        this.closeModalVisible = true;
        // TODO: @fmoretti - Remove pointer-events from buttons and quick replies.
        this.removePointerEvents();
        this.interactionService.closeContact(this.closeDimensions);
        break;
      case 'close-and-remove':
        this.interactionService.closeContact(this.closeDimensions);
        this.closeApp();
        break;
    }
  }
  closeUploadPanel() {
    this.interactionService.closeUploadPanel();
  }
  dismissCloseModal() {
    this.closeModalVisible = false;
    this.interactionService.dismissCloseModal();
  }
  doUpload(upload) {
    this.interactionService.sendAttachment(upload);
  }
  exitFromFullScreen() {
    this.interactionService.setNormalScreen();
    if (this.isMobile) {
      this.interactionService.setDimensions(this.dimensions.fullscreen);
    }
  }
  expandWidget(isFullScreen) {
    this.trackMinizedStatus(false);
    this.interactionService.maximizeWidget(isFullScreen, (isFullScreen || this.isMobile) ? this.dimensions.fullscreen : this.dimensions.normal);
  }
  getCloseStep(context) {
    if (!context.contactStarted) {
      return 'remove-app';
    }
    if (context.isInQueue) {
      return 'close-and-remove';
    }
    if (context.isClosed) {
      if (context.hasSurvey && context.canRemoveApp) {
        if (this.surveyVisible) {
          return 'remove-app';
        } else {
          return 'show-survey';
        }
      } else {
        return 'remove-app';
      }
    } else {
      if (context.variables.askCloseConfirm) {
        if (this.closeModalVisible) {
          if (context.variables.stayInAppAfterClose) {
            return 'close-and-stay';
          } else {
            if (context.hasSurvey) {
              if (this.surveyVisible) {
                return 'remove-app';
              } else {
                return 'close-and-survey';
              }
            } else {
              return 'close-and-remove';
            }
          }
        } else {
          return 'show-close-modal';
        }
      } else {
        if (context.variables.stayInAppAfterClose) {
          return 'close-and-stay';
        } else {
          if (context.hasSurvey) {
            if (this.surveyVisible) {
              return 'remove-app';
            } else {
              return 'close-and-survey';
            }
          } else {
            return 'close-and-remove';
          }
        }
      }
    }
  }
  hangUpCall() {
    this.interactionService.hangUp(this.closeDimensions);
  }
  hasToStayInApp(context) {
    return (context.isClosed && context.variables.stayInAppAfterClose);
  }
  hideChat() {
    this.interactionService.hideChat();
  }

  listenForEvents(evt) {
    if (evt) {
      switch (evt.type) {
        case 'closedByAgent':
        case 'removedMediaScreen':
        case 'incomingOffer':
          this.interactionService.setDimensions(this.closeDimensions);
          break;
      }
    }
  }
  markRead(msgId: string){
    this.interactionService.markRead(msgId);
  }
  maximizeCbn(isMobile: boolean, notRead: boolean) {
    this.interactionService.maximizeWidget(false, isMobile ? this.dimensions.fullscreen : this.dimensions.normal);
    if (notRead) {
      this.upgradeCbnToChat();
    }
  }
  minimizeCbn(isMobile: boolean) {
    this.interactionService.minimizeWidget(isMobile ? this.dimensions.minimizedCbnMobile : this.dimensions.minimizedCbn);
  }
  minimizeWidget() {
    this.trackMinizedStatus(true);
    this.interactionService.minimizeWidget(this.dimensions.minimized);
  }
  minimizeMedia() {
    this.interactionService.minimizeMedia();
  }
  trackMinizedStatus(status){
    if(this.supportsStorages()){
      if(status){
        sessionStorage.setItem("vvcMinimizedStatus", status);
      }else{
        sessionStorage.removeItem("vvcMinimizedStatus");
      }
    }
  }
  muteToggle(muted) {
    this.interactionService.muteToggle(muted);
  }
  openAttachment(url: string, click?: boolean) {
    if(this.isMobile){
      this.minimizeWidget();
    }
    this.interactionService.openAttachment(url, click);
  }
  processAction(action) {
    this.interactionService.sendPostBack(action);
  }
  processQuickReply(reply) {
    this.interactionService.processQuickReply(reply);
  }
  rejectAgentRequest(requestId) {
    this.interactionService.rejectAgentRequest(requestId);
  }
  rejectOffer() {
    this.interactionService.rejectOffer();
  }
  sendFailed(message){
    this.interactionService.sendText(message.text);
  }
  sendIsWriting() {
    this.interactionService.sendIsWriting();
  }
  sendText(value, isEmojiPanelVisible) {
    if (isEmojiPanelVisible) {
      this.toggleEmojiPanel();
    }
    this.interactionService.sendText(value);
  }
  setFullScreen() {
    this.expandWidget(true);
  }
  setInitialDimensions(context) {
    this.isMobile = context.isMobile;
    this.selector = (context.campaign.channels.web.interaction || {}).selector || null;
    if (this.selector) {
      this.closeDimensions = this.dimensions.embedded;
    } else {
      this.closeDimensions = context.isMobile ? this.dimensions.fullscreen : this.dimensions.normal;
    }
    this.interactionService.setDimensions(this.closeDimensions);

    if (context.mediaPreset === 'sync' || !!context.conversationId || !!context.fromConversation) {
      this.minimizeWidget();
    }
    if(this.supportsStorages()){
      if (sessionStorage.vvcMinimizedStatus && context.variables && (context.variables.rememberMinimizedStatus || (context.variables.minimizeOnLink && this.isMobile))) {
        this.minimizeWidget();
      }
    }
  }
  showCloseDialog(context) {
    return context && !context.isCLosed && context.variables && context.variables.askCloseConfirm && !this.closeModalVisible;
  }
  showCloseModal(closeOpt) {
    if (closeOpt.forceClose) {
      this.interactionService.closeContact(this.closeDimensions);
      if (!closeOpt.stayInAppAfterClose && !closeOpt.hasSurvey) {
        this.closeApp();
      } else if (closeOpt.hasSurvey && !closeOpt.stayInAppAfterClose) {
        this.showSurvey();
      }
    } else {
      this.interactionService.showCloseModal();
    }
  }
  showUploadPanel() {
    this.interactionService.showUploadPanel();
  }
  showSurvey() {
    this.interactionService.showSurvey();
  }
  submitDataCollection(dc) {
    this.interactionService.submitDataCollection(dc);
  }
  toggleCamera() {
    this.interactionService.toggleCamera();
  }
  toggleEmojiPanel() {
    this.interactionService.toggleEmojiPanel();
  }
  trackByMethod(index: number, elem: any){
    return elem.id;
  }
  updateLeftScrollOffset(scrollObject: { scrollLeft: number, messageId: string}) {
    this.interactionService.updateLeftScrollOffset(scrollObject);
  }
  upgradeCbnToChat() {
    this.interactionService.upgradeCbnToChat();
  }
  upgradeInboundToChat() {
    this.interactionService.upgradeInboundToChat();
  }
  videoToggle(show) {
    this.interactionService.toggleVideo(show);
  }
  supportsStorages() { try {
    return (!!window.localStorage
      && !!window.sessionStorage
      && typeof localStorage.getItem === 'function'
      && typeof localStorage.setItem === 'function'
      && typeof localStorage.removeItem === 'function'
      && typeof sessionStorage.getItem === 'function'
      && typeof sessionStorage.setItem === 'function'
      && typeof sessionStorage.removeItem === 'function')
    } catch(e) {
      return false
    };
  }

  /**
   * Hide chatbox when a specific parameters is received by message.
   */
  isHideChatBoxMessage(message): boolean {
    if (!message) {
      return true;
    } else {
      if (!!message.quick_replies) {
        if (message.body && message.body === 'hide_text_input') {
          this.hideTextInput = true;
          return true;
        } else {
          this.hideTextInput = false;
          return false;
        }
      } else if (!!message.template) {
        return !!message.original.hide_text_input;
      } else {
        return false;
      }
    }
  }

  isChatBoxVisible({isChatVisible, isChatBoxVisible, messages}: UiState): boolean {
    const lastMessage = messages.slice().reverse().find(msg => !!msg.agent);
    return isChatVisible && isChatBoxVisible && !this.isHideChatBoxMessage(lastMessage);
  }

  /**
   * Register the `rawmessage` observable for subscribing to several custom actions based on the `action_code` key.
   */
  registerCustomActions() {
    this.interactionService
      .registerCustomAction({ id: 'rawmessage' })
      .pipe(filter(message => message.type === 'action' && message.args))
      .subscribe(message => {
        if (!!message.action_code) {
          switch (message.action_code) {
            case 'setAgent': {
              if (!!message.args && (!!message.args[0].avatar || !!message.args[0].nickname || !!message.args[0].status)) {
                if (!!message.args[0].avatar) {
                  this.agent.avatar = message.args[0].avatar;
                }
                if (!!message.args[0].nickname) {
                  this.agent.nickname = message.args[0].nickname;
                }
                if (!!message.args[0].status) {
                  this.agent.status = message.args[0].status;
                }
              } else {
                this.agent = {};
              }
              break;
            }
            case 'showUploadIcon': {
              this.uploadIcon = message.args[0].show;
              break;
            }
            default: {
              console.info('No case found.');
            }
          }
        }
      });
  }

  /**
   * Disable pointer events on buttons to make them not clickable after closing the chat with visible messages.
   */
  removePointerEvents() {
    const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('button');
    buttons.forEach(button => {
      if (!button.classList.contains('web_url')) {
        button.style.pointerEvents = 'none';
      }
    });
  }

  /**
   * Hide top controls if a specific postMessage for doing so is received.
   */
  toggleTopControlsVisibility() {
    fromEvent(window, 'message')
      .pipe(filter((event: MessageEvent) => 'hideTopControls' in event.data))
      .subscribe(value => {
        if (!!value) {
          this.hideTopControls = true;
        }
      });
  }
}
