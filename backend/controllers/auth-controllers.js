import z from "zod";
import user from "../model/user.js";
import zoderror from "../utils/zod-error.js";
import generateVerificationToken from "../utils/verification-token.js";
import generateJWTtoken from "../utils/jwt.js";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../resend/email.js";
export function signin(req, res) {
  res.send("signin");
}

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
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();
    let dataCreation = await user.create({
      email,
      password: hashedpassword,
      username,
      verificationToken: verificationToken,
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
      message: "user succeessfully signed in",
      user: {
        ...dataCreation._doc,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
export function logout(req, res) {
  res.send("logout");
}
