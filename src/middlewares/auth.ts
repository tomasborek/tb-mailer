import {Request, Response, NextFunction} from "express";
import { ZodSchema } from "zod";
import { HttpsResponse } from "../utils/feedback/responses";


export const validate = (schema: ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            return new HttpsResponse(res, {message: 'Validation error', status: 400}).send();
        }
    }
};