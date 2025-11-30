import express from 'express';
import { LoginSchema } from '../../helpers/validations/auth/login';
import { RegisterSchema } from '../../helpers/validations/auth/register';
import BodyValidationMiddleware from "../../helpers/middlewares/validation";
import { db } from '../../database/db';
import { CreateToken } from "../../helpers/email/verification";
import { eq } from 'drizzle-orm';
import { requireNoAuth } from '../../helpers/middlewares/auth';
import { UsersTable } from '../../database';
import { ComparePassword, EncryptPassword } from '../../helpers/middlewares/encryptions/pass';
import { signToken } from '../../helpers/jwt';
import { connectionsTable } from '../../database/schemas/connections';


const router = express.Router();

// me
router.get('/me', async (req, res) => {
    if (!req.user) return res.json({});
    const [user] = await db
    .select({
        ID: UsersTable.ID,
        username: UsersTable.username,
        email: UsersTable.email,
        profilePicture: UsersTable.ProfilePicture,
        emailVerified: UsersTable.emailVerified,
        createdAt: UsersTable.createdAt
    })
    .from(UsersTable)
    .where(eq(UsersTable.ID, req.user.ID));
    

    let connections = await db
        .select()
        .from(connectionsTable)
        .where(eq(connectionsTable.userID, req.user.ID));
}
)


// Login
router.post('/login',
    requireNoAuth,
    (req, res, next) => BodyValidationMiddleware(req, res, next, LoginSchema),
    async (req, res) => {
        const { email, password } = req.body;

        const [user] = await db
            .select()
            .from(UsersTable)
            .where(eq(UsersTable.email, email));
        if(!user)
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
                errors: {
                    email: ["Invalid email or password"],
                },
            });
        if(!ComparePassword(password, user.password))
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
                errors: {
                    email: ["Invalid email or password"],
                },
            });
        if(!user.emailVerified)
            return res.status(400).json({
                success: false,
                message: "Email not verified",
                errors: {
                    email: ["Please verify your email before logging in."],
                },
            });

            res.json({ success: true, data: { ID: user.ID, token: signToken(user.ID) },
         });
    }
);

// Register
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
                    username: `${username}`.trim() || null,
                    
                })
                .$returningId();
                await CreateToken(email)
                res.json({ success: true, data: { ID: User.ID } });
            
      });
      
export default router;
