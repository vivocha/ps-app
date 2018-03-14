import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromStore from '../store';
import {VvcContextService} from './context.service';
import {ContextState} from '../store/models.interface';
import {VvcContactWrap} from './contact-wrap.service';


@Injectable()
export class VvcInteractionService {

  private vivocha;
  private context: ContextState;

  agentRequestCallback;

  constructor(
    private store: Store<fromStore.AppState>,
    private contextService: VvcContextService,
    private contactService: VvcContactWrap
  ){

  }

  /**** PUBLIC METHOD ****/
  acceptOffer(opts) {
    /*
    const diffOffer = this.incomingOffer;
    this.callStartedWith = 'VOICE';
    if (opts === 'voice-only' && diffOffer.Video) {
      diffOffer.Video.tx = 'off';
      this.callStartedWith = 'VIDEO';
    }
    if (opts === 'video-full' && diffOffer.Video) {
      diffOffer.Video.tx = 'required'; // TODO CHECK FOR CAPS
      this.callStartedWith = 'VIDEO';
    }
    this.mergeOffer(diffOffer);
    this.dispatch(new fromStore.UpdateMessage({
      id: this.incomingId,
      state: 'loading'
    }))
    */
  }
  acceptRequest(res, msg) {
    /*
    this.agentRequestCallback(null, res);
    this.dispatch(new fromStore.RemoveMessage({ id: this.incomingId }));
    this.dispatch(new fromStore.NewMessage({
      id: new Date().getTime(),
      type: 'incoming-request',
      media: msg.media,
      state: 'closed',
      text: msg.text + '_ACCEPTED'
    }))*/
  }
  acceptIncomingRequest(evt, msg) {
    if (msg.type === 'incoming-request') {
      this.acceptRequest(evt, msg);
    } else {
      this.acceptOffer(evt);

    }
  }
  init(){
    this.contextService.ready().subscribe( (context:ContextState) => {
      if (context.loaded) {
        this.vivocha = this.contextService.getVivocha();
        this.context = context;

        this.contactService.initializeContact(this.vivocha, this.context);
      }
    })
  }
  getState(){
    return this.store.select(fromStore.getUiState);
  }

}