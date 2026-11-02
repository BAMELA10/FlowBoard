import type { NextFunction, Request, Response } from "express"
import { z } from "zod"

export const validatePayload = (schema: z.Schema, source: 'body' | 'query' | 'params' = 'body' ) => {
    return  (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req[source])
        if (!result.success) {
          return res.status(400).json({
            error: "Validation failed",
            details: result.error.flatten().fieldErrors,
          });
        }
        req[source] = result.data;
        next();
    }
}