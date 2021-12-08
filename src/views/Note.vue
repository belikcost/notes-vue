<template>
  <ChangeNote
    :note="note"
    :onChangeNote="onChangeNote"
    :onExit="onExit"
    :onRemoveNote="onExitAndRemoveNote"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import {
  ChangeNoteInterface,
  NoteItemInterface,
  RemoveNoteInterface,
} from "@/types";
import ChangeNote from "@/components/ChangeNote/index.vue";
import { validateNoteTitle, validateTask } from "@/utils";

export default defineComponent({
  name: "Note",
  components: {
    ChangeNote,
  },
  props: {
    onChangeNote: {
      type: Function as PropType<ChangeNoteInterface>,
      required: true,
    },
    onRemoveNote: {
      type: Function as PropType<RemoveNoteInterface>,
      required: true,
    },
  },
  computed: {
    note() {
      const notes = this.$attrs.notes as NoteItemInterface[];
      const noteId = this.$attrs.noteId as string;

      return notes.find((note: NoteItemInterface) => note.id === +noteId);
    },
  },
  methods: {
    onExitAndRemoveNote() {
      this.onExit();
      const noteId = this.note?.id as number;

      this.onRemoveNote(noteId);
    },
    onExit() {
      const note = this.note as NoteItemInterface;

      if (!this.validateNote(note)) {
        this.onRemoveNote(note.id);
      }

      this.$router.push("/");
    },
    validateNote(note: NoteItemInterface) {
      let valid = true;

      if (!validateNoteTitle(note.title)) {
        valid = false;
      }

      note.tasks.forEach((task) => {
        if (!validateTask(task)) {
          valid = false;
        }
      });

      return valid;
    },
  },
});
</script>
