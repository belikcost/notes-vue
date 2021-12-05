<template>
  <router-view
    :notes="notes"
    :changeNote="changeNote"
    :removeNote="removeNote"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NoteItemInterface } from "@/types";

const INITIAL_NOTES: NoteItemInterface[] = [
  {
    id: 1,
    title: "Tasks on Monday",
    tasks: [
      {
        id: 1,
        name: "Wash a cat",
        completed: false,
      },
      {
        id: 2,
        name: "Call the wholes",
        completed: true,
      },
    ],
  },
  {
    id: 2,
    title: "Tasks on Tuesday",
    tasks: [
      {
        id: 1,
        name: "Go to store",
        completed: true,
      },
      {
        id: 2,
        name: "Kick the wholes",
        completed: false,
      },
    ],
  },
];

export default defineComponent({
  name: "App",
  data() {
    return {
      notes: INITIAL_NOTES,
    };
  },
  methods: {
    removeNote(noteId: NoteItemInterface["id"]) {
      this.$data.notes = this.$data.notes.filter((note) => note.id !== noteId);
    },
    changeNote(changedNote: NoteItemInterface) {
      this.$data.notes = this.$data.notes.map((note) =>
        note.id === changedNote.id ? changedNote : note
      );
    },
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
