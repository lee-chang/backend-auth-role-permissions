import jwt from "jsonwebtoken";
import { Payload } from "../interfaces/jwt.payload.interface";
import { ENV_CONFIG } from "@/config/env.config";

export const generateToken = (payload: Payload) => {
  return new Promise<string | undefined>((resolve, reject) => {

    // ** Checkboxes rememberMe
    const expiresIn = payload.rememberMe ? "30d" : "1d";

    jwt.sign(
      { id: payload.id, authority: payload.authority },
      ENV_CONFIG.JWT_SECRET,
      { expiresIn: expiresIn },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
