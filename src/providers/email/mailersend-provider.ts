import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";
import { Environment } from "../../app/environment";
import { AppError } from "../../app/errors/app-error";
import { IEmailProvider } from "./models/email-provider";

export class MailersendProvider implements IEmailProvider {
  client: MailerSend;
  sender: Sender;

  constructor() {
    this.client = new MailerSend({
      apiKey: Environment.MAILERSEND_API_KEY,
    });

    this.sender = new Sender(
      Environment.MAILERSEND_SENDER_EMAIL,
      Environment.MAILERSEND_SENDER_NAME
    );
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const recipients = [new Recipient(to)];

    const emailParams = new EmailParams()
      .setFrom(this.sender)
      .setTo(recipients)
      .setSubject(subject)
      .setText(body);

    try {
      await this.client.email.send(emailParams);
    } catch (error) {
      throw new AppError("Error sending email", 500);
    }
  }
}
