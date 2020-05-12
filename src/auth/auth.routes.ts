import { Router } from 'express';
import jwt from 'express-jwt';
import getAuthService from '@src/auth/auth.service';
import { ExtendedRequest } from '@src/auth/auth.models';
import { secretKey } from '@src/config';
import { DatabaseInterface } from "@src/database/database.models";
import ResponseSender from '@src/utils/responseSender';

const authResMessages = {
  invalidUser: 'Send incorrect user object',
  logout: 'Successful logout'
}

const authRouter = (dbConnect: DatabaseInterface) => {
  const router = Router();
  const AuthService = getAuthService(dbConnect);

  router.post('/login', async (req, res) => {
    const userData = req.body;
    if (!userData?.login || !userData?.password) {
      ResponseSender.sendError(res, authResMessages.invalidUser);
      return;
    }
    try {
      const token = await AuthService.login(userData);

      ResponseSender.sendSuccess(res, token);
    } catch (error) {
      ResponseSender.sendError(res, error);
    }
  });

  router.post('/refresh', async (req, res) => {
    const { refreshToken } = req.body;

    try {
      const token = await AuthService.refreshToken(refreshToken);
      ResponseSender.sendSuccess(res, token);
    } catch (error) {
      ResponseSender.sendError(res, error, { statusCode: 403 });
    }
  });

  router.post('/logout', jwt({ secret: secretKey }), async (req: ExtendedRequest, res) => {
    try {
      const { login } = req.user;
      await AuthService.removeRefreshToken({login});
      ResponseSender.sendSuccess(res, authResMessages.logout);
    } catch (e) {
      ResponseSender.sendError(res);
    }
  });

  return router;
}

export default authRouter;
