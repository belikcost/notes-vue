<template>
  <router-view
    :notes="notes"
    :onChangeNote="onChangeNote"
    :onRemoveNote="onRemoveNote"
    :onCreateNote="createNoteWithRouter"
  />
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from "vue";
import { NoteItemInterface } from "@/types";
import AppNotesStore from "@/entites/AppNotesStore";
import { INITIAL_NOTES } from "@/components/NotesList/constants";

export default defineComponent({
  name: "App",
  setup() {
    const AppNotesStoreInstance = reactive(new AppNotesStore(INITIAL_NOTES));

    const notes = computed(() => {
      return AppNotesStoreInstance.getNotes();
    });

    watch(
      () => [...notes.value],
      (notes) => localStorage.setItem("notes", JSON.stringify(notes))
    );

    return { NotesStore: AppNotesStoreInstance, notes };
  },
  methods: {
    createNoteWithRouter() {
      this.NotesStore.createNoteAndRedirect(this.$router);
    },
    onRemoveNote(noteId: NoteItemInterface["id"]) {
      this.NotesStore.removeNote(noteId);
    },
    onChangeNote(changedNote: NoteItemInterface) {
      this.NotesStore.changeNote(changedNote);
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
