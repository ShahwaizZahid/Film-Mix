import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Generate a JWT token
export const generateToken = (user: {
  id: string;
  email: string;
  username: string;
}): string => {
  return jwt.sign(user, JWT_SECRET);
};

// Verify a JWT token
export const verifyToken = (token: string) => {
  try {
    const decodedToken: any = jwt.verify(token, JWT_SECRET);
    return decodedToken.id;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
