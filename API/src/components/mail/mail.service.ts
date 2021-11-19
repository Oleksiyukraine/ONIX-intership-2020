import { Injectable } from '@nestjs/common';
import * as mailService from '@sendgrid/mail';
import constants from 'src/constants/jwt.constants';
import { IMailInterface } from './interfaces/mail.interface';

@Injectable()
export class MailService {
  async sendEmail(emailData: IMailInterface) {
    mailService.setApiKey(constants.mail.apiKey);
    const msg = {
      from: constants.mail.sender,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
    };
    await mailService.send(msg);
  }
}
