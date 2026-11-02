// src/errors/http-error.ts
export class HttpError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(
    statusCode: number,
    code: string,
    message: string,
    details?: unknown,
  ) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;

    // Nécessaire pour que instanceof fonctionne correctement
    // quand la classe est transpilée vers ES5
    Object.setPrototypeOf(this, new.target.prototype);

    // Capture la stack trace proprement
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
