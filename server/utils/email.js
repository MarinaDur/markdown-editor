import nodemailer from "nodemailer";

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Markdown support <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return 1;
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject, text, html) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text,
      html,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswordReset() {
    const message = "Click on the link to reset your password.";
    const htmlContent = `
      <p>Hi ${this.firstName},</p>
      <p>You requested a password reset. Click the button below to reset your password:</p>
      <a href="${this.url}" style="
        display: inline-block;
        padding: 10px 20px;
        margin: 10px 0;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      ">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
    `;
    await this.send("Your password reset token", message, htmlContent);
  }
}

export default Email;
