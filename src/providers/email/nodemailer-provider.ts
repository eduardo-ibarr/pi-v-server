import { Transporter, createTransport } from "nodemailer";
import { Environment } from "../../app/environment";

export class NodemailerProvider {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: Environment.EMAIL_HOST,
      port: Number(Environment.EMAIL_PORT),
      secure: Environment.EMAIL_SECURE === "true",
      auth: {
        user: Environment.EMAIL_USER,
        pass: Environment.EMAIL_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        to,
        from: Environment.EMAIL_USER,
        subject,
        html: body,
      });
    } catch (error) {
      console.error("Erro ao enviar e-mail", error);
      throw new Error("Erro ao enviar e-mail.");
    }
  }
}
