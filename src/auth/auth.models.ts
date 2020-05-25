import { Request } from "express";

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface AuthRequest extends Request {
  user: {
    login: string;
  }
}
