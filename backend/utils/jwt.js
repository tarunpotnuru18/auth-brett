import jwt from "jsonwebtoken";
export default function generateJWTtoken(userid, key) {
  let token = jwt.sign({ userid }, key, { expiresIn: "5d" });
 
  return token;
}
