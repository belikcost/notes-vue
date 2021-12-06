<template>
  <router-view
    :notes="notes"
    :onChangeNote="changeNote"
    :onRemoveNote="removeNote"
    :onCreateNote="createNote"
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

const INITIAL_NOTE = {
  title: "",
  tasks: [],
};

interface AppStateInterface {
  notes: NoteItemInterface[];
}

export default defineComponent({
  name: "App",
  data(): AppStateInterface {
    return {
      notes: this.getInitialNotes(),
    };
  },
  watch: {
    notes() {
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
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
    createNote() {
      const id = Math.floor(Math.random() * 100);

      this.$data.notes = [...this.$data.notes, { id, ...INITIAL_NOTE }];
      this.$router.push(`/${id}`);
    },
    getInitialNotes(): NoteItemInterface[] {
      const notesFromStorage = localStorage.getItem("notes");
      let initialNotes = INITIAL_NOTES;

      if (notesFromStorage) {
        initialNotes = JSON.parse(notesFromStorage);
      }

      return initialNotes;
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
</style>
