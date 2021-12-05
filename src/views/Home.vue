<template>
  <div class="home">
    <NotesList :notes="notes" :onRemoveNote="onRemoveNote" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import NotesList from "@/components/NotesList/index.vue";
import { NoteItemInterface, OnRemoveNoteInterface } from "@/types";

export default defineComponent({
  name: "Home",
  components: {
    NotesList,
  },
  props: {
    notes: {
      type: Array as PropType<NoteItemInterface[]>,
      required: true,
    },
    onRemoveNote: {
      type: Function as PropType<OnRemoveNoteInterface>,
      required: true,
    },
  },
});
</script>
