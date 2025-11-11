import "dotenv/config";
import express from "express";
const app = express();



console.log("Starting server...");
if (!process.env.PORT) throw new Error("PORT is not defined in .env");

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
});