import { Router } from 'express';
import getOperationsService from './operation.service';
import { DatabaseInterface } from '@src/database/database.models';
import ResponseSender from '@src/utils/responseSender';

const operationRouter = (dbConnect: DatabaseInterface) => {
  const router = Router();
  const OperationsService = getOperationsService(dbConnect);

  router.get('/', (req, res) => {
    OperationsService.getData()
      .then((data) => {
        ResponseSender.sendSuccess(res, data);
      })
      .catch((error: any) => {
        ResponseSender.sendError(res, error);
      });
  });

  router.post('/', (req, res) => {
    OperationsService.addData(req.body)
      .then((savedData: any) => {
        ResponseSender.sendSuccess(res, savedData);
      })
      .catch((error: any) => {
        ResponseSender.sendError(res, error);
      });
  });

  return router;
}

export default operationRouter;
