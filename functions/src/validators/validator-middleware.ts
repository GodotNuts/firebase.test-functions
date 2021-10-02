import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export function validateRequest(request: Request, response: Response, next: NextFunction) {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
       response.status(400).json({ errors: errors });
    }
    else {
        next();
    }
}