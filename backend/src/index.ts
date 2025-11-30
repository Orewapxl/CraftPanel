import "dotenv/config";
import dotenv from "dotenv";
import express from "express";
const app = express();
app.use(express.json());
dotenv.config();



declare global {
  namespace Express {
    interface Request {
      user?: { ID: string };
      headers: Record<string, string>;
    }
  }
}
console.log("Starting server...");
if (!process.env.PORT) throw new Error("PORT is not defined in .env");



import router from "./routes";
app.use("/", router);

app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (res.headersSent) return next(err);
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
);

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
});
