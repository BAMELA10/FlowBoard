// src/middlewares/error-handler.ts
import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/http-error";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  // 1. Erreur HTTP connue (levée volontairement par le code métier)
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        ...(err.details !== undefined && { details: err.details }),
      },
    });
    return;
  }


  // 3. Erreur inattendue : on loggue côté serveur, on ne fuit rien au client
  console.error("[UNHANDLED ERROR]", err);

  res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
    },
  });
}
