import * as express from "express"

declare global {
  namespace Express {
    interface Request {
      user: string | JwtPayload;
    }

    interface Response {
      user: string | JwtPayload;
    }

  }
}