const db = require('../../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
  const events = await db.query(escape`
    SELECT eventId, name, date, guest, description
    FROM events
  `)
  
  res.status(200).json(events)
}