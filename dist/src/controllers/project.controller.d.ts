import { Request, Response } from "express";
export declare class ProjectController {
    private projectService;
    constructor();
    createProject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    editProject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=project.controller.d.ts.map