<template>
  <div class="home">
    <NotesList :notes="notes" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import NotesList from "@/components/NotesList/index.vue";
import { NoteItemInterface } from "@/types";

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
  },
});
</script>
