import { notesApi, type Note } from '@/utils/notes'

export const useNotes = () => {
  const newNote = ref('')

  const {
    data: notes,
    pending,
    error,
    refresh
  } = useAsyncData('notes', () => notesApi.getAll(), {
    default: () => []
  })

  watch(newNote, () => {
    if (addError.value) addError.value = null
  })

  const notesCount = computed(() => notes.value.length)

  const isEmpty = computed(() => notes.value.length === 0)

  const isAddDisabled = computed(() => {
    return addPending.value || !newNote.value.trim()
  })

  const addError = ref<string | null>(null)
  const addPending = ref(false)
  const deletePendingIds = ref(new Set<number>())

  const isDeleting = (id: number) => deletePendingIds.value.has(id)

  const addNote = async () => {
    const text = newNote.value.trim()
    if (!text) {
      addError.value = 'You can\'t add an empty note'
      return
    }

    addError.value = null
    addPending.value = true
    try {
      await notesApi.create(text)
      newNote.value = ''
      await refresh()
    } finally {
      addPending.value = false
    }
  }

  const isConfirmOpen = ref(false)
  const confirmDeleteId = ref<number | null>(null)

  const askDelete = (id: number) => {
    confirmDeleteId.value = id
    isConfirmOpen.value = true
  }

  const cancelDelete = () => {
    isConfirmOpen.value = false
    confirmDeleteId.value = null
  }

  const confirmDelete = async () => {
    if (confirmDeleteId.value === null) return
    await deleteNote(confirmDeleteId.value)
    cancelDelete()
  }

  const deleteNote = async (id: number) => {
    deletePendingIds.value.add(id)
    try {
      await notesApi.remove(id)
      await refresh()
    } finally {
      deletePendingIds.value.delete(id)
    }
  }

  // Editing (optional if you already added it)
  const editingId = ref<number | null>(null)
  const draftText = ref('')
  const savePending = ref(false)

  const startEdit = (note: Note) => {
    editingId.value = note.id
    draftText.value = note.text
  }

  const cancelEdit = () => {
    editingId.value = null
    draftText.value = ''
  }

  const saveEdit = async () => {
    if (editingId.value === null) return
    const text = draftText.value.trim()
    if (!text) return

    savePending.value = true
    try {
      await notesApi.update(editingId.value, text)
      cancelEdit()
      await refresh()
    } finally {
      savePending.value = false
    }
  }

  return {
    // data
    notes,
    notesCount,
    isEmpty,
    isAddDisabled,

    // fetch state
    pending,
    error,
    refresh,

    // create
    newNote,
    addPending,
    addError,
    addNote,

    // delete
    isDeleting,
    deleteNote,
    isConfirmOpen,
    confirmDeleteId,
    askDelete,
    cancelDelete,
    confirmDelete,

    // edit
    editingId,
    draftText,
    savePending,
    startEdit,
    cancelEdit,
    saveEdit
  }
}
