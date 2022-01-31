<template>
  <ChangeNote
    v-if="note"
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
import NoteValidator from "@/domain/NoteValidator";

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
  created() {
    if (!this.note) {
      this.$router.push("/");
    }
  },
  methods: {
    onExitAndRemoveNote() {
      this.onExit();
      const noteId = this.note?.id as number;

      this.onRemoveNote(noteId);
    },
    onExit() {
      const note = this.note as NoteItemInterface;

      const NoteValidatorInstance = new NoteValidator(note);
      const noteValid = NoteValidatorInstance.getValid();

      if (!noteValid) {
        this.onRemoveNote(note.id);
      }

      this.$router.push("/");
    },
  },
});
</script>
