<template>
  <div v-if="unDoChanges.active">
    <span class="help-tool_handler" @click="unDoChanges.onUse">
      Отменить изменения
    </span>
  </div>
  <div v-if="returnChanges.active">
    <span class="help-tool_handler" @click="returnChanges.onUse">
      Вернуть отмененные изменения
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { HelpToolInterface } from "@/components/ChangeNote/types";

export default defineComponent({
  name: "HelpTools",
  props: {
    unDoChanges: {
      type: Object as PropType<HelpToolInterface>,
      required: true,
    },
    returnChanges: {
      type: Object as PropType<HelpToolInterface>,
      required: true,
    },
  },
});
</script>

<style scoped>
.help-tool_handler {
  text-decoration: underline;
  cursor: pointer;
}
</style>
