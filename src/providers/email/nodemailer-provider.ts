import { Transporter, createTransport } from "nodemailer";

export class NodemailerProvider {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        to,
        from: process.env.EMAIL_USER,
        subject,
        html: body,
      });
    } catch (error) {
      console.error("Erro ao enviar e-mail", error);
      throw new Error("Erro ao enviar e-mail.");
    }
  }
}
