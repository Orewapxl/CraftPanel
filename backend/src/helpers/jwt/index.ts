import { sign, verify } from "jsonwebtoken";

export function signToken(userID: string) {
    sign({ ID: userID }, process.env.JWT_SECRET as string, { expiresIn: '5d' });
}
export function verifyToken(token: string) {
  verify(token, process.env.JWT_SECRET as string) as { ID: string };
}  