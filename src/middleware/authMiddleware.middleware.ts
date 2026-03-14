import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model";

dotenv.config();

// Extend the Express Request interface to include user property
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Get token from authorization header
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }
            return decoded;
        }) as any;
        
        // Attach user data to request
        req.user = decoded;
        
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
