import { Router } from 'express';
import jwt from 'express-jwt';
import getAuthService from '@src/auth/auth.service';
import { ExtendedRequest } from '@src/auth/auth.models';
import { secretKey } from '@src/config';
import { DatabaseInterface } from "@src/database/database.models";
import ResponseSender from '@src/utils/responseSender';
import validation from './auth.schemas';

const authResMessages = {
  invalidUser: 'Send incorrect user object',
  logout: 'Successful logout'
}

const authRouter = (dbConnect: DatabaseInterface) => {
  const router = Router();
  const AuthService = getAuthService(dbConnect);

  router.post('/login', async (req, res) => {
    try {
      const userData = await validation.userSchema.validateAsync(req.body);
      const token = await AuthService.login(userData);

      ResponseSender.sendSuccess(res, token);
    } catch (error) {
      ResponseSender.sendError(res, error);
    }
  });

  router.post('/refresh', async (req, res) => {
    try {
      const { refreshToken } = await validation.tokenSchema.validateAsync(req.body);
      const token = await AuthService.refreshToken(refreshToken);
      ResponseSender.sendSuccess(res, token);
    } catch (error) {
      ResponseSender.sendError(res, error, { statusCode: 403 });
    }
  });

  router.post('/logout', jwt({ secret: secretKey }), async (req: ExtendedRequest, res) => {
    try {
      const { login } = await validation.jwtSchema.validateAsync(req.user);
      await AuthService.removeRefreshToken({login});
      ResponseSender.sendSuccess(res, authResMessages.logout);
    } catch (error) {
      ResponseSender.sendError(res, error);
    }
  });

  return router;
}

export default authRouter;
