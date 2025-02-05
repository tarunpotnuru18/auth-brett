import z from "zod";
import user from "../model/user.js";
import zoderror from "../utils/zod-error.js";
import generateVerificationToken from "../utils/verification-token.js";
import generateJWTtoken from "../utils/jwt.js";
import bcrypt from "bcryptjs";
import { sendVerificationEmail, sendWelcomeEmail } from "../resend/email.js";

export async function signup(req, res) {
  try {
    let { username, email, password } = req.body;
    let userSchema = z.object({
      email: z.string("invalid data type").email("invalid email format"),
      username: z
        .string("invalid data type")
        .min(3, "username must be atleast 3 characters"),
      password: z
        .string("invalid data type")
        .min(5, "password must be atleast 5 characters "),
    });
    let validation = userSchema.safeParse(req.body);
    /* it returns two things [sucess:trueor false,error]
       taht error s an specially desgined object we can acess the complete details of teh error by using .error.issues or .error.errors in teh dcouemnetaion they mentioned onluy about .issues but there is .errors also wither wayfollow the docuemnation
       console.log( validation.error.issues); 
        */
    if (validation.success === false) {
      let response = zoderror(validation.error.issues);
      res.status(400).json(response);
      return;
    }
    const userAlreadyexists = await user.findOne({ email });
    if (userAlreadyexists) {
      res.status(400).json({
        message: "user already exists",
      });
      return;
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();
    const hashedVerificationToken = await bcrypt.hash(verificationToken, 10);
    let dataCreation = await user.create({
      email,
      password: hashedpassword,
      username,
      verificationToken: hashedVerificationToken,
      verficationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    let jwttoken = generateJWTtoken(
      dataCreation._id,
      process.env.jwt_key.toString()
    );
    res.cookie("token", jwttoken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      samesite: "strict",
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });
    sendVerificationEmail("tarunpotnuru18@gmail.com", verificationToken);
    res.status(201).json({
      success: true,
      message: "user succeessfully signedup in",
      user: {
        ...dataCreation._doc,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
///////////////////////////////////////////////////////////////////////////////////////////
export async function login(req, res) {
  try {
    let { email, password } = req.body;
    let userDetails = await user.findOne({
      email,
    });
    if (!userDetails) {
      res.status(400).json({
        success: false,
        message: "invalid credentials",
      });
      return;
    }
    let isPasswordValid = await bcrypt.compare(password, userDetails.password);

    if (!isPasswordValid) {
      res.status(400).json({
        success: false,
        message: "invalid password",
      });
      return;
    }

    let verifed = userDetails.isVerified;
    if (!verifed) {
      res.status(400).json({
        success: false,
        message: "user not verified",
      });
      return;
    }
    let jwttoken = generateJWTtoken(
      userDetails._id,
      process.env.jwt_key.toString()
    );

    res.cookie("token", jwttoken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      samesite: "strict",
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "user successfully logged in",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function logout(req, res) {
  res.send("logout");
}
//////////////////////////////////////////////////////////////////////////////////////////////////
export async function verifyEmail(req, res) {
  try {
    console.log(req.body);
    const { verificationToken, email } = req.body;

    let userDetails = await user.findOne({
      email,
      verficationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!userDetails) {
      res.status(401).json({
        message: "user does not exist",
        success: false,
      });
      return;
    }
    console.log(verificationToken, userDetails.verificationToken);

    let isVerificationTokenValid = await bcrypt.compare(
      verificationToken.toString(),
      userDetails.verificationToken
    );
    if (!isVerificationTokenValid) {
      res.status(401).json({
        message: "verification token invalid",
        success: false,
      });
      return;
    }
    userDetails.isVerified = true;
    userDetails.verificationToken = undefined;
    userDetails.verficationTokenExpiresAt = undefined;
    await userDetails.save();

    await sendWelcomeEmail("tarunpotnuru18@gmail.com", userDetails.username);
    res.status(200).json({
      message: "verification successful",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
