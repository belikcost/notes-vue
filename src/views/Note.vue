<template>
  <ChangeNote
    :note="note"
    :onChangeNote="onChangeNote"
    @exit="onExit"
    @removeNote="onRemoveNote"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { OnChangeNoteInterface, NoteItemInterface } from "@/types";
import ChangeNote from "@/components/ChangeNote/index.vue";

export default defineComponent({
  name: "Note",
  components: {
    ChangeNote,
  },
  computed: {
    note() {
      const notes = this.$attrs.notes as NoteItemInterface[];
      const noteId = this.$attrs.noteId as string;

      return notes.find((note: NoteItemInterface) => note.id === +noteId);
    },
    onChangeNote() {
      return (note: NoteItemInterface) =>
        (this.$attrs.changeNote as OnChangeNoteInterface)(note);
    },
  },
  methods: {
    onRemoveNote() {
      this.onExit();

      const removeNote = this.$attrs.removeNote as (noteId: number) => void;
      const noteId = this.note?.id as number;

      removeNote(noteId);
    },
    onExit() {
      this.$router.push("/");
    },
  },
});
</script>
