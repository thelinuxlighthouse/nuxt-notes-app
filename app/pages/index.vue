<script setup lang="ts">
const {
  notes,
  pending,
  error,
  refresh,

  notesCount,
  isEmpty,
  isAddDisabled,

  newNote,
  addPending,
  addError,
  addNote,

  isDeleting,
  isConfirmOpen,
  askDelete,
  cancelDelete,
  confirmDelete,

  editingId,
  draftText,
  savePending,
  startEdit,
  cancelEdit,
  saveEdit
} = useNotes()
</script>

<template>
  <UPage>
    <UPageSection
      title="My Notes"
      :ui="{ container: 'sm:w-2xl', title: 'text-shadow-lg text-primary text-5xl lg:text-7xl underline' }"
    >
      <UBadge
        color="neutral"
        variant="soft"
        :ui="{ base: 'flex justify-center font-bold text-2xl' }"
        size="xl"
      >
        {{ notesCount }} {{ notesCount === 1 ? 'note' : 'notes' }}
      </UBadge>
      <!-- Create row -->
      <div class="space-y-2">
        <div class="flex gap-2 items-center">
          <UInput
            v-model="newNote"
            placeholder="New note"
            class="flex-1"
            :color="addError ? 'error' : 'neutral'"
            @keydown.enter="addNote"
          />

          <UButton
            :loading="addPending"
            :disabled="isAddDisabled"
            @click="addNote"
          >
            Add
          </UButton>
        </div>

        <UAlert
          v-if="addError"
          color="error"
          variant="soft"
          :title="addError"
        />
      </div>

      <!-- Loading -->
      <div
        v-if="pending"
        class="mt-4"
      >
        <ULoadingIcon class="mr-2 inline-block" />
        Loading notes…
      </div>

      <!-- Error -->
      <UAlert
        v-else-if="error"
        class="mt-4"
        title="Couldn\'t load notes"
        :description="(error as any).message"
        color="error"
        variant="soft"
      >
        <template #actions>
          <UButton
            variant="soft"
            @click="refresh"
          >
            Retry
          </UButton>
        </template>
      </UAlert>

      <!-- List -->
      <div
        v-else
        class="mt-4 space-y-2"
      >
        <UCard
          v-for="note in notes"
          :key="note.id"
          class="flex items-center justify-between gap-3"
        >
          <div class="flex-1">
            <template v-if="editingId === note.id">
              <UInput
                v-model="draftText"
                :disabled="savePending"
                @keydown.enter="saveEdit"
              />
            </template>

            <template v-else>
              <div class="font-medium">
                {{ note.text }}
              </div>
              <div class="text-xs opacity-70">
                ID: {{ note.id }}
              </div>
            </template>
          </div>

          <div class="flex gap-2 pt-3">
            <template v-if="editingId === note.id">
              <UButton
                :loading="savePending"
                :disabled="savePending"
                @click="saveEdit"
              >
                Save
              </UButton>

              <UButton
                variant="soft"
                :disabled="savePending"
                @click="cancelEdit"
              >
                Cancel
              </UButton>
            </template>

            <template v-else>
              <UButton
                variant="soft"
                @click="startEdit(note)"
              >
                Edit
              </UButton>

              <UButton
                color="error"
                variant="soft"
                :loading="isDeleting(note.id)"
                :disabled="isDeleting(note.id)"
                @click="askDelete(note.id)"
              >
                Delete
              </UButton>
            </template>
          </div>
        </UCard>
        <UModal
          :open="isConfirmOpen"
          title="Are you sure you want to delete this note?"
        >
          <template #body>
            <div class="flex gap-2">
              <UButton
                color="error"
                variant="soft"
                @click="confirmDelete"
              >
                Confirm
              </UButton>

              <UButton
                variant="soft"
                @click="cancelDelete"
              >
                Cancel
              </UButton>
            </div>
          </template>
        </UModal>

        <UAlert
          v-if="isEmpty"
          title="No notes yet"
          description="Add your first note above."
          variant="soft"
        />
      </div>
    </UPageSection>
  </UPage>
</template>
