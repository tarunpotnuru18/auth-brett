import resend from "./config.js";
export async function sendVerificationEmail(email, verificationToken) {
  try {

    
    const { data, error } = await resend.emails.send({
      from: "Acme <onBoarding@resend.dev>",

      to: [email],
      subject: "verify your email address now",
      html: "verify your email address with this token: " + verificationToken,
    });
  } catch (error) {
    console.log("error sending verification email", error);
    throw new Error("error sending verification email");
  }
}
