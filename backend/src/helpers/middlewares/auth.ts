import express from "express";
export function requireAuth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    if (!req.user)
        return res.status(401).json({ message: "Authentication required" });
    next();
}

export function requireNoAuth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    if (req.user)            
        return res.status(400).json({ message: "Already authenticated" });
    next();
}

