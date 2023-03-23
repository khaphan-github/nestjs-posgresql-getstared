import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { events } from './event/event.constant';
import { EmailSender } from './event/event.payload';

@Injectable()
export class NotifyService {
  @OnEvent(events.EMAIL_SENDER)
  handleSendEmailEvent(payload: EmailSender) {
    setTimeout(() => {
      console.log('Send notify to: ', payload.content);
    }, 3000);
  }
}
