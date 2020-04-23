const fs = require('fs');
const database = require('../../database.json');

function saveOperation(data) {
  const currentData = JSON.parse(database);
  currentData.push(data);
  console.log('currentData', currentData);

  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream('src/database.json');
    writeStream.on('finish', () => {
      resolve(data);
    });
    writeStream.on('error', (error) => {
      reject(error);
    });

    const dataToSave = JSON.stringify(currentData);
    writeStream.write(dataToSave);
    writeStream.end();
  });
}

module.exports = saveOperation;
