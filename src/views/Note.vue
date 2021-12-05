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
import { OnChangeNoteInterface, NoteItemInterface, OnRemoveNoteInterface } from "@/types";
import ChangeNote from "@/components/ChangeNote/index.vue";

export default defineComponent({
  name: "Note",
  components: {
    ChangeNote,
  },
  props: {
    onChangeNote: {
      type: Function as PropType<OnChangeNoteInterface>,
      required: true,
    },
    onRemoveNote: {
      type: Function as PropType<OnRemoveNoteInterface>,
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
      this.$router.push("/");
    },
  },
});
</script>
