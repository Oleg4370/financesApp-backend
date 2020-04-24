import express from 'express';
import OperationsService from 'src/services/operations.service';
const router = express.Router();

router.get('/', function (req, res) {
    OperationsService.getData()
        .then(() => {
            res
                .header("Content-Type",'application/json')
                .send('all operations here');
        })
        .catch((error: any) => {
            res.status(500).send(error);
        });
});

router.post('/', function (req, res) {
    OperationsService.addData(req.body)
      .then((savedData: any) => {
          res.status(200).send(savedData);
      })
      .catch((error: any) => {
          res.status(500).send(error);
      });
});

export default router;
