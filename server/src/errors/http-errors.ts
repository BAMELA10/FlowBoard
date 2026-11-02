// src/errors/http-errors.ts
import { HttpError } from "./http-error";

export class BadRequestError extends HttpError {
  constructor(message = "Bad request", details?: unknown) {
    super(400, "BAD_REQUEST", message, details);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized") {
    super(401, "UNAUTHORIZED", message);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = "Forbidden") {
    super(403, "FORBIDDEN", message);
  }
}

export class NotFoundError extends HttpError {
  constructor(resource = "Resource") {
    super(404, "NOT_FOUND", `${resource} not found`);
  }
}

export class ConflictError extends HttpError {
  constructor(message = "Conflict", details?: unknown) {
    super(409, "CONFLICT", message, details);
  }
}

export class ValidationError extends HttpError {
  constructor(message = "Validation failed", details?: unknown) {
    super(422, "VALIDATION_ERROR", message, details);
  }
}

export class TooManyRequestsError extends HttpError {
  constructor(message = "Too many requests") {
    super(429, "TOO_MANY_REQUESTS", message);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = "Internal server error") {
    super(500, "INTERNAL_SERVER_ERROR", message);
  }
}
