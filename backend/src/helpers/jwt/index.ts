import { sign, verify } from "jsonwebtoken";

export function signToken(userId: string) {
    sign({ id: userId }, process.env.JWT_SECRET as string, { expiresIn: '5d' });
}
export function verifyToken(token: string) {
  verify(token, process.env.JWT_SECRET as string) as { id: string };
}  