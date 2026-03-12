export type Note = {
  id: number
  text: string
}

export const notesApi = {
  getAll() {
    return $fetch<Note[]>('/api/notes')
  },

  create(text: string) {
    return $fetch<Note>('/api/notes', {
      method: 'POST',
      body: { text }
    })
  },

  update(id: number, text: string) {
    return $fetch(`/api/notes/${id}`, {
      method: 'PUT',
      body: { text }
    })
  },

  remove(id: number) {
    return $fetch(`/api/notes/${id}`, {
      method: 'DELETE'
    })
  }
}
