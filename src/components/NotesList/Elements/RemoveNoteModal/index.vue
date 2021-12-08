<template>
  <Modal>
    <p>Do you really want to remove this note?</p>
    <div class="remove-note-modal__footer">
      <Button @click="hideModal">Cancel</Button>
      <Button @click="confirmRemoveNote">Ok</Button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RemoveNoteInterface } from "@/types";
import Modal from "@/primitives/Modal/index.vue";
import Button from "@/primitives/Button/index.vue";

export default defineComponent({
  name: "RemoveNoteModal",
  components: {
    Modal,
    Button,
  },
  props: {
    onRemoveNote: {
      type: Function as PropType<RemoveNoteInterface>,
      required: true,
    },
    noteId: {
      type: String as PropType<string>,
      required: true,
    },
  },
  methods: {
    hideModal() {
      this.$router.push("/");
    },
    confirmRemoveNote() {
      this.onRemoveNote(+this.noteId);
      this.hideModal();
    },
  },
});
</script>

<style scoped>
.remove-note-modal__footer {
  display: flex;
  justify-content: space-between;
}
</style>
