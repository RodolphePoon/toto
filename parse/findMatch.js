module.exports = (string = '', match, dontmatch = '\n\t\r') => {
  const regex = new RegExp(`${match}([^${match.replace('|', '')}${dontmatch}])*`, 'gi')
  const matchedString = (string.match(regex) || [])[0] || ''
  return matchedString.replace(match, '').trim()
}