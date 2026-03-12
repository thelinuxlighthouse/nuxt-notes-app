import db from '../../utils/db'

export default defineEventHandler((event) => {
  const idParam = getRouterParam(event, 'id')
  const id = Number(idParam)

  if (!Number.isFinite(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid id' })
  }

  const stmt = db.prepare('DELETE FROM notes WHERE id = ?')
  const info = stmt.run(id)

  if (info.changes === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Note not found' })
  }

  return { ok: true }
})
