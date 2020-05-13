import { Router } from 'express';
import getOperationsService from './operation.service';
import { DatabaseInterface } from '@src/database/database.models';
import { successResponse, errorResponse } from '@src/utils/responseBuilder';

const operationRouter = (dbConnect: DatabaseInterface) => {
  const router = Router();
  const OperationsService = getOperationsService(dbConnect);

  router.get('/', (req, res) => {
    OperationsService.getData()
      .then((data) => {
        const {headers, status, body} = successResponse(data);
        res.set(headers).status(status).send(body);
      })
      .catch((error: any) => {
        const {headers, status, body} = errorResponse(error);
        res.set(headers).status(status).send(body);
      });
  });

  router.post('/', (req, res) => {
    OperationsService.addData(req.body)
      .then((savedData: any) => {
        const {headers, status, body} = successResponse(savedData);
        res.set(headers).status(status).send(body);
      })
      .catch((error: any) => {
        const {headers, status, body} = errorResponse(error);
        res.set(headers).status(status).send(body);
      });
  });

  return router;
}

export default operationRouter;
