import jwt from "jsonwebtoken";
export async function verifyToken(req, res, next) {
  try {
    let { token } = req.cookies;
    if (!token) {
      res.status(401).json({
        success: false,
        message: "unauthorized",
      });
      return;
    }
    let decoded = jwt.verify(token, process.env.jwt_key);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }
    req.userid = decoded.userid;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
}
