import express from 'express';
import { LoginSchema } from '../../helpers/validations/auth/login';
import { RegisterSchema } from '../../helpers/validations/auth/register';
import BodyValidationMiddleware from "../../helpers/middlewares/validation";
import { db } from '../../database/db';
import { CreateToken } from "../../helpers/email/verification";
import { eq } from 'drizzle-orm';
import { requireNoAuth } from '../../helpers/middlewares/auth';
import { UsersTable } from '../../database';
import { EncryptPassword } from '../../helpers/middlewares/encryptions/pass';


const router = express.Router();

router.post('/register',
     requireNoAuth,
     (req, res, next) => BodyValidationMiddleware(req, res, next, RegisterSchema),
      async (req, res) => {
            const { username, email, password } = req.body;


            const [existingUser] = await db
                .select()
                .from(UsersTable)
                .where(eq(UsersTable.email, email));


            if (existingUser)
                return res.status(400).json({
                  success: false,
                  message: "email already exists",
                  errors: {
                    email: ["This email is already registered."],
                  },
                });

            const [User] = await db
                .insert(UsersTable)
                .values({
                    email,
                    password: EncryptPassword(password),
                    name: `${username}`.trim() || null,
                    
                })
                .$returningId();
                await CreateToken(email)
                res.json({ success: true, data: { id: User.id } });
            
      });
      
export default router;