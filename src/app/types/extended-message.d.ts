import { BaseMessage } from "@vivocha/client-interaction-core/lib/store/models.interface";

export interface ExtendedMessage extends BaseMessage {
  hide_text_input?: boolean
}
