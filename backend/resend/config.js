import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
 const resend = new Resend(process.env.resend_key)
 export default resend