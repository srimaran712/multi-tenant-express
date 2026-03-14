import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
export declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=authMiddleware.middleware.d.ts.map