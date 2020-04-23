const database = require('../../database.json');

function getOperations() {
  return database;
}
module.exports = getOperations;
