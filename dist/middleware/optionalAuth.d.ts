import { Request, Response, NextFunction } from 'express';
/**
 * Optional authentication middleware
 * Doesn't fail if no token is provided, but populates req.user if valid token exists
 */
export declare const optionalAuthenticate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=optionalAuth.d.ts.map