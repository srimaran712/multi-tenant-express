import { Request, Response } from 'express';
export declare class UserController {
    private userSerivce;
    constructor();
    login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    addUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=user.controller.d.ts.map