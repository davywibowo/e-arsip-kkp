import jwt, { JwtPayload } from "jsonwebtoken";

interface JwtDecoded extends JwtPayload {
  username: string;
  password: string;
}

export default class JWT {
  static generateToken(data: { username: string; password: string }): string {
    return jwt.sign(data, process.env.PRIVATE_KEY as string, {
      expiresIn: "1h",
      algorithm: "HS256",
    });
  }
  static verifyToken(token: string | null): JwtDecoded | null {
    try {
      if (!token) {
        return null;
      }
      const decoded = jwt.verify(
        token,
        process.env.PRIVATE_KEY as string
      ) as JwtDecoded;
      return decoded;
    } catch (error) {
      console.log("Error verify token:", error);
      return null;
    }
  }
}
