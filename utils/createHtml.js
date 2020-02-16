const fs = require('fs')
module.exports = (id, html) => fs.writeFileSync(`${id}_raw.html`, html);