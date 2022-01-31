import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Note from "../views/Note.vue";
import RemoveNoteModal from "@/components/NotesList/Elements/RemoveNoteModal/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Home,
    children: [
      {
        name: "RemoveNoteModal",
        path: "/remove/:noteId",
        component: RemoveNoteModal,
        props: true,
      },
    ],
  },
  {
    name: "Note",
    path: "/:noteId",
    component: Note,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
