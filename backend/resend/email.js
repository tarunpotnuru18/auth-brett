import resend from "./config.js";
import { verificationEmailTemplate,welcomeEmailTemplate } from "./email-template.js";
export async function sendVerificationEmail(email, verificationToken) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onBoarding@resend.dev>",

      to: [email],
      subject: "verify your email address now",
      html: verificationEmailTemplate.replace("{verification}", verificationToken),
    });
    // console.log(data,error)
  } catch (error) {
    console.log("error sending verification email", error);
    throw new Error("error sending verification email");
  }
}
export async function sendWelcomeEmail(email, name) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onBoarding@resend.dev>",

      to: [email],
      subject: "welcome to the best auth app!",
      html: welcomeEmailTemplate.replace("{userName}", name),
    });
    // console.log(data,error)
  } catch (error) {
    console.log("error sending welcome email", error);
    throw new Error("error sending welcome email");
  }
}
