<template>
  <router-view
    :notes="notes"
    :onChangeNote="onChangeNote"
    :onRemoveNote="onRemoveNote"
    :onCreateNote="onCreateNote"
  />
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from "vue";
import { NoteItemInterface } from "@/types";
import { INITIAL_NOTES } from "@/components/NotesList/constants";
import NotesStore from "@/domain/NotesStore";

export default defineComponent({
  name: "App",
  setup() {
    const appNotesStoreInstance = reactive(
      new NotesStore(INITIAL_NOTES, localStorage)
    );

    const notes = computed(() => {
      return appNotesStoreInstance.getNotes();
    });

    watch(
      () => [...notes.value],
      () => appNotesStoreInstance.saveNotesToStorage()
    );

    return { notesStore: appNotesStoreInstance, notes };
  },
  methods: {
    onCreateNote() {
      const id = Math.floor(Math.random() * 100);

      this.notesStore.createNote(id);
      this.$router.push(`/${id}`);
    },
    onRemoveNote(noteId: NoteItemInterface["id"]) {
      this.notesStore.removeNote(noteId);
    },
    onChangeNote(changedNote: NoteItemInterface) {
      this.notesStore.changeNote(changedNote);
    },
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
