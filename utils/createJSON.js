const fs = require('fs')
module.exports = (fileName, json) => {
  fs.writeFileSync(`${fileName}.json`, JSON.stringify(json, null, 2));
}