<template>
  <div>
    <header class="note-item__header">
      <h3>{{ title }}</h3>
      <router-link :to="{ name: 'Note', params: { noteId: id } }">
        <svg
          class="note-item_icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          xml:space="preserve"
        >
          <path
            d="m502.625 105.375-96-96c-12.5-12.5-32.75-12.5-45.25 0l-36.688 36.688 141.25 141.25 36.688-36.688c12.5-12.5 12.5-32.75 0-45.25zM.953 472.234a32.015 32.015 0 0 0 8.422 30.391 32.001 32.001 0 0 0 30.391 8.422l102.922-25.734-116-116L.953 472.234zM361.375 129l-59.313-59.313S38.749 333.083 36.999 335l59 59.375L361.375 129zM118.625 416 178 475c1.938-1.875 265.313-265.063 265.313-265.063L384 150.625 118.625 416z"
          />
        </svg>
      </router-link>
      <router-link :to="{ name: 'RemoveNoteModal', params: { noteId: id } }">
        <svg
          class="note-item_icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 6.0683594 22 L 17.931641 22 L 19.634766 7 L 4.3652344 7 z"
          />
        </svg>
      </router-link>
    </header>
    <ul>
      <li v-for="task in shortTasks" :key="task.id">
        <div class="task-item">
          <p>{{ task.name }}</p>
          <input
            class="task-item_checkbox"
            type="checkbox"
            disabled="disabled"
            :checked="task.completed"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { NoteItemInterface } from "@/types";
import "./index.css";

const TASKS_DEFAULT_LENGTH = 3;

export default defineComponent({
  name: "NoteItem",
  props: {
    id: {
      type: Number as PropType<NoteItemInterface["id"]>,
      required: true,
    },
    title: {
      type: String as PropType<NoteItemInterface["title"]>,
      required: true,
    },
    tasks: {
      type: Array as PropType<NoteItemInterface["tasks"]>,
      required: true,
    },
  },
  computed: {
    shortTasks() {
      return this.tasks.slice(0, TASKS_DEFAULT_LENGTH);
    },
  },
  methods: {
    getCheckboxStatus(completed: boolean) {
      return completed ? "checked" : "";
    },
  },
});
</script>
