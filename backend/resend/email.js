import resend from "./config.js";
import {
  verificationEmailTemplate,
  welcomeEmailTemplate,
} from "./email-template.js";
export async function sendVerificationEmail(email, verificationToken) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onBoarding@resend.dev>",

      to: [email],
      subject: "verify your email address now",
      html: verificationEmailTemplate.replace(
        "{verification}",
        verificationToken
      ),
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
export async function sendResetEmail(email, token) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onBoarding@resend.dev>",

      to: [email],
      subject: "here is your password reset email!",
      html: "hey there here is your password reset token " + token,
    });
    // console.log(data,error)
  } catch (error) {
    console.log("error sending reset email", error);
    throw new Error("error sending reset email");
  }
}
export async function sendChangePasswordEmail(email) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onBoarding@resend.dev>",
      to: [email],
      subject: "password changed successfully",
      html: "your password changed sucessfully",
    });
  } catch (error) {}
}
