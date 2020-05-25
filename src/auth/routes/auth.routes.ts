import { Router } from 'express';
import jwt from 'express-jwt';
import { config } from '@src/config';
import { getAuthService } from '@src/auth/auth.service';
import { AuthRequest } from '@src/auth/auth.models';
import { DatabaseInterface } from '@src/database/database.service';
import { getErrorResponse, successResponse } from '@src/utils/responseBuilder';
import * as validation from './auth.schemas';

const authResMessages = {
  invalidUser: 'Send incorrect user object',
  logout: 'Successful logout'
}

export const authRouter = (dbConnect: DatabaseInterface) => {
  const router = Router();
  const AuthService = getAuthService(dbConnect);

  router.post('/login', async (req, res) => {
    try {
      const userData = await validation.userSchema.validateAsync(req.body);
      const token = await AuthService.login(userData);

      const {headers, status, body} = successResponse(token);
      res.set(headers).status(status).send(body);
    } catch (error) {
      const {headers, status, body} = getErrorResponse(error);
      res.set(headers).status(status).send(body);
    }
  });

  router.post('/refresh', async (req, res) => {
    try {
      const { refreshToken } = await validation.tokenSchema.validateAsync(req.body);
      const token = await AuthService.refreshToken(refreshToken);

      const {headers, status, body} = successResponse(token);
      res.set(headers).status(status).send(body);
    } catch (error) {
      const {headers, status, body} = getErrorResponse(error);
      res.set(headers).status(status).send(body);
    }
  });

  router.post('/logout', jwt({ secret: config.token.secret }), async (req: AuthRequest, res) => {
    try {
      const { login } = await validation.jwtSchema.validateAsync(req.user);
      await AuthService.removeRefreshToken({login});

      const {headers, status, body} = successResponse(authResMessages.logout);
      res.set(headers).status(status).send(body);
    } catch (error) {
      const {headers, status, body} = getErrorResponse(error);
      res.set(headers).status(status).send(body);
    }
  });

  return router;
}
