import db from '../../utils/db'

export default defineEventHandler(async (event) => {
  const idParam = getRouterParam(event, 'id')
  const id = Number(idParam)

  if (!Number.isFinite(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid id' })
  }

  const body = await readBody<{ text?: string }>(event)
  const text = (body?.text ?? '').trim()

  if (!text) {
    throw createError({ statusCode: 400, statusMessage: 'Text is required' })
  }

  const stmt = db.prepare('UPDATE notes SET text = ? WHERE id = ?')
  const info = stmt.run(text, id)

  if (info.changes === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Note not found' })
  }

  return { ok: true, id, text }
})
