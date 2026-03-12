import Database from 'better-sqlite3'

const db = new Database('notes.db')

// create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY,
    text TEXT NOT NULL
  )
`)

export default db
