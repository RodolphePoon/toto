const DAY = 24 * 60 * 60

module.exports = (date, limit = DAY) => date && (Math.floor(Date.now() / 1000) - date) < limit