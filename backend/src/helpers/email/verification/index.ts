import crypto from "crypto";
import { emailVerificationTable } from "../../../database/schemas/verifyEmail";
import { db } from "../../../database/db";
import { UsersTable } from "../../../database";
import { eq } from "drizzle-orm";
import { sendEmail } from "../send";




export async function CreateToken(email: string){
    const [user] = await db
        .select()
        .from(UsersTable)
        .where(eq(UsersTable.email, email));
    if(!user) throw new Error("User not found");
    const token =
        Buffer.from(JSON.stringify({email, timestamp: Date.now()})).toString('base64') + '.' +
        crypto.randomBytes(16).toString('hex');
        
        await db.insert(emailVerificationTable).values({
            id:crypto.randomUUID(),
            userId: user.id,
            token,
});

  sendEmail("verifyEmail", email, {
    SUBJECT: "Verify your email",
    VERIFY_LINK: `${process.env.DESIGN_APP_URL}/auth/verify-email?token=${token}`,
  });
}