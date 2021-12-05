<template>
  <Modal>
    <p>{{ message }}</p>
    <div class="confirm-modal__footer">
      <Button @click="resetModal">Cancel</Button>
      <Button @click="confirmEvent">Ok</Button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Modal from "@/primitives/Modal/index.vue";
import Button from "@/primitives/Button/index.vue";

export default defineComponent({
  name: "ConfirmModal",
  components: {
    Modal,
    Button,
  },
  props: {
    message: {
      type: String as PropType<string>,
      required: true,
    },
    confirmEvent: {
      type: Function as PropType<() => void>,
      required: true,
    },
    resetModal: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
});
</script>

<style scoped>
.confirm-modal__footer {
  display: flex;
  justify-content: space-between;
}
</style>
