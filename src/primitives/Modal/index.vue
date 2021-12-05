<template>
  <div class="modal-container">
    <div class="modal">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
});
</script>

<style scoped>
.modal-container {
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.2);
}

.modal {
  max-width: 600px;
  width: 100%;

  margin: 0 20px;
  padding: 20px;

  border-radius: 20px;
  background-color: #fff;
}
</style>
