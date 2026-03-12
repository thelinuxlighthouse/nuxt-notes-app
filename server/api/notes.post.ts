import db from '../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ text?: string }>(event)

  const text = (body?.text ?? '').trim()
  if (!text) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Text is required'
    })
  }

  const stmt = db.prepare('INSERT INTO notes (text) VALUES (?)')
  const info = stmt.run(text)

  return {
    id: Number(info.lastInsertRowid),
    text
  }
})
