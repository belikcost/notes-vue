<template>
  <NoteItem v-for="note in notes" v-bind="note" :key="note.id" />
  <router-view :onCheckNote="checkNote" :onRemoveNote="onRemoveNote" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { NoteItemInterface, RemoveNoteInterface } from "@/types";
import NoteItem from "@/components/NotesList/Elements/NoteItem/index.vue";

export default defineComponent({
  name: "NotesList",
  components: {
    NoteItem,
  },
  props: {
    notes: {
      type: Array as PropType<NoteItemInterface[]>,
      required: true,
    },
    onRemoveNote: {
      type: Function as PropType<RemoveNoteInterface>,
      required: true,
    },
  },
  methods: {
    checkNote(noteId: NoteItemInterface["id"]) {
      return this.notes.some((note) => note.id === noteId);
    },
  },
});
</script>
