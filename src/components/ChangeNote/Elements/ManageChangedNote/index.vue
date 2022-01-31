<template>
  <div class="change-note__button-group">
    <Button @click="openExitModal">Exit</Button>
    <Button @click="onSaveChanges">Save</Button>
    <Button @click="openRemoveNoteModal">Remove</Button>
  </div>
  <ConfirmModal
    v-if="modal.show"
    :message="modal.message"
    :confirmCallback="modal.confirmCallback"
    :resetModal="onResetModal"
  />
</template>

<script lang="ts">
import { ModalInterface } from "../../types";
import { defineComponent, PropType } from "vue";
import ConfirmModal from "@/components/ChangeNote/Elements/ConfirmModal/index.vue";
import Button from "@/primitives/Button/index.vue";

const INITIAL_MODAL = {
  show: false,
  message: null,
  confirmCallback: null,
};

export default defineComponent({
  name: "ManageChangedNote",
  components: {
    ConfirmModal,
    Button,
  },
  data(): { modal: ModalInterface } {
    return {
      modal: INITIAL_MODAL,
    };
  },
  props: {
    onRemoveNote: {
      type: Function as PropType<() => void>,
      required: true,
    },
    onExit: {
      type: Function as PropType<() => void>,
      required: true,
    },
    onSaveChanges: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  methods: {
    openRemoveNoteModal() {
      this.$data.modal = {
        show: true,
        message: "Do you really want to remove this note?",
        confirmCallback: () => this.onRemoveNote(),
      };
    },
    openExitModal() {
      this.$data.modal = {
        show: true,
        message: "Do you really want to exit?",
        confirmCallback: () => this.onExit(),
      };
    },
    onResetModal() {
      this.$data.modal = INITIAL_MODAL;
    },
  },
});
</script>
