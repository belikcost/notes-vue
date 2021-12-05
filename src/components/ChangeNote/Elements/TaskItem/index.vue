<template>
  <div class="changed-task-item">
    <TextLabel text="Name">
      <input type="text" :value="task.name" @change="onChangeName" />
    </TextLabel>
    <TextLabel text="Did complete?">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="onChangeCompleted"
      />
    </TextLabel>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { EventType, TaskItemInterface } from "@/types";
import TextLabel from "@/primitives/TextLabel/index.vue";

export default defineComponent({
  name: "TaskItem",
  components: {
    TextLabel,
  },
  props: {
    task: {
      type: Object as PropType<TaskItemInterface>,
      required: true,
    },
  },
  emits: ["change-task"],
  methods: {
    onChangeName(e: EventType) {
      const { value } = e.target;
      this.$emit("change-task", {
        ...this.task,
        name: value,
      });
    },
    onChangeCompleted(e: EventType) {
      const { checked } = e.target;
      this.$emit("change-task", {
        ...this.task,
        completed: checked,
      });
    },
  },
});
</script>

<style scoped>
.changed-task-item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  padding: 15px 0;
  margin-bottom: 15px;

  border-bottom: 1px solid #ccc;
}
</style>
