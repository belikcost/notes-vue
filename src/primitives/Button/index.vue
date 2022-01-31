<template>
  <button class="button">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",
});
</script>

<style scoped>
.button {
  display: block;

  background-color: #2c3e50;
  color: #fff;

  width: 200px;

  padding: 10px 30px;

  border: none;
  border-radius: 20px;
  cursor: pointer;

  font-size: 18px;
  font-weight: bold;
}
</style>
