import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
export declare const adminMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=adminMiddleware.middleware.d.ts.map