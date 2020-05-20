import { Router } from 'express';
import { getOperationsService } from '../operation.service';
import { DatabaseInterface } from '@src/database/database.service';
import { successResponse, createdResponse, getErrorResponse, internalErrorResponse } from '@src/utils/responseBuilder';
import { operationSchema } from './operation.schemas';

export const operationRouter = (dbConnect: DatabaseInterface) => {
  const router = Router();
  const OperationsService = getOperationsService(dbConnect);

  router.get('/', (req, res) => {
    try {
      const opportunities = OperationsService.getData();
      const {headers, status, body} = successResponse(opportunities);

      res.set(headers).status(status).send(body);
    } catch (error) {
      const {headers, status, body} = internalErrorResponse(error);
      res.set(headers).status(status).send(body);
    }
  });

  router.post('/', async (req, res) => {
    try {
      const opportunity = await operationSchema.validateAsync(req.body);
      const savedOpportunity = await OperationsService.addData(opportunity);
      const {headers, status, body} = createdResponse(savedOpportunity);

      res.set(headers).status(status).send(body);
    } catch (error) {
      const {headers, status, body} = getErrorResponse(error);
      res.set(headers).status(status).send(body);
    }
  });

  return router;
}
