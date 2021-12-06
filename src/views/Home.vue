<template>
  <div>
    <NotesList :notes="notes" :onRemoveNote="onRemoveNote" />
    <Button @click="onCreateNote">Create note</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import NotesList from "@/components/NotesList/index.vue";
import {
  NoteItemInterface,
  OnCreateNoteInterface,
  OnRemoveNoteInterface,
} from "@/types";
import Button from "@/primitives/Button/index.vue";

export default defineComponent({
  name: "Home",
  components: {
    NotesList,
    Button,
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
    onCreateNote: {
      type: Function as PropType<OnCreateNoteInterface>,
      required: true,
    },
  },
  methods: {
    onKeyPress(ev: KeyboardEvent) {
      if (ev.key === "Enter" && this.$route.path === "/") {
        this.onCreateNote();
      }
    },
  },
  mounted() {
    document.addEventListener("keypress", this.onKeyPress);
  },
  unmounted() {
    document.removeEventListener("keypress", this.onKeyPress);
  },
});
</script>
