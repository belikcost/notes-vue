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
    <div class="changed-task-item_error" v-if="error">
      Check the correctness of the entered data
    </div>
    <span @click="onRemoveTask">
      <svg
        class="changed-task-item_icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 6.0683594 22 L 17.931641 22 L 19.634766 7 L 4.3652344 7 z"
        />
      </svg>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { EventType, TaskItemInterface } from "@/types";
import TextLabel from "@/primitives/TextLabel/index.vue";
import Button from "@/primitives/Button/index.vue";

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
    onChangeTask: {
      type: Function as PropType<(newTask: TaskItemInterface) => void>,
      required: true,
    },
    onRemoveTask: {
      type: Function as PropType<() => void>,
      required: true,
    },
    error: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  methods: {
    onChangeName(e: EventType) {
      const { value } = e.target;
      this.onChangeTask({
        ...this.task,
        name: value,
      });
    },
    onChangeCompleted(e: EventType) {
      const { checked } = e.target;
      this.onChangeTask({
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

.changed-task-item_error {
  color: crimson;

  font-size: 14px;

  margin: 15px 0;
}

.changed-task-item_icon {
  width: 20px;
  height: 20px;

  fill: #2c3e50;
  cursor: pointer;
}
</style>
