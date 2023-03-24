import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { events } from './event/event.constant';
import { EmailSender } from './event/event.payload';

@Injectable()
export class LogerService {
  @OnEvent(events.TEST_EVENT)
  handleSendEmailEvent(payload: EmailSender) {
    console.log('Send email to: ', payload.email);
  }
}
