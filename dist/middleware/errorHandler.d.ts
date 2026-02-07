import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-validator';
export interface AppError extends Error {
    statusCode?: number;
    errors?: ValidationError[];
}
export declare const errorHandler: (err: AppError, req: Request, res: Response, next: NextFunction) => void;
export declare const notFound: (req: Request, res: Response) => void;
//# sourceMappingURL=errorHandler.d.ts.map