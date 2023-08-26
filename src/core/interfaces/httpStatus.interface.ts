// Create http status interface

export interface IHttpStatus {
  OK: HttpStatus;
  BAD_REQUEST: HttpStatus;
  UNAUTHORIZED: HttpStatus;
  NOT_FOUND: HttpStatus;
  FORBIDDEN: HttpStatus;
  INTERNAL_SERVER_ERROR: HttpStatus;
}

// Create http status enum

export enum HttpStatus {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}