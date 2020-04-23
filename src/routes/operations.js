const express = require('express');
const router = express.Router();
const saveOperationHandler = require('../handlers/operations/saveOperation');
const getOperationsHandler = require('../handlers/operations/getOperations');

router.get('/', function (req, res) {
  res
    .header("Content-Type",'application/json')
    .send(getOperationsHandler());
});

router.post('/', function (req, res) {
  saveOperationHandler(req.body)
      .then((savedData) => {
          res.status(200).send(savedData);
      })
      .catch((error) => {
          res.status(500).send(error);
      });
});

module.exports = router;
