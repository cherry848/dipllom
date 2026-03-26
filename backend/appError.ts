export enum ErrorCodes {
  // Auth
  USER_EXIST = "USER_EXIST",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  TOKEN_ERROR = "TOKEN_ERROR",
  INVALID_DATA = "INVALID_DATA",

  // Course
  COURSE_NOT_FOUND = "COURSE_NOT_FOUND",
}

export class AppError extends Error {
  code: ErrorCodes;

  constructor(message: string, code: ErrorCodes) {
    super(message);
    this.code = code;
  }
}
