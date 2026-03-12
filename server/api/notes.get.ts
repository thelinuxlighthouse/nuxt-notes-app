import db from '../utils/db'

export default defineEventHandler(() => {
  const stmt = db.prepare('SELECT * FROM notes ORDER BY id ASC')
  return stmt.all()
})
