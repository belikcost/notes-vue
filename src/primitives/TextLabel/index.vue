<template>
  <label class="text-label">
    <span>{{ text }}</span>
    <slot />
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextLabel",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.text-label {
  display: flex;
  align-items: center;

  margin: 10px 0;
}

.text-label span {
  font-size: 15px;

  margin-right: 5px;
}
</style>
