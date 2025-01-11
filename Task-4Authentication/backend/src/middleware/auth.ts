import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const authenticate = (req: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
      return (req.userId = payload.userId);
    } catch {
      throw new Error("Invalid or expired token");
    }
  }
  return null;
};
