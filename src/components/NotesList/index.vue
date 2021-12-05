<template>
  <NoteItem v-for="note in notes" v-bind="note" :key="note.id" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { NoteItemInterface } from "@/types";
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
  },
});
</script>
