import NotesStore from "@/entites/NotesStore";
import { NoteItemInterface } from "@/types";
import { Router } from "vue-router";

export default class AppNotesStore extends NotesStore {
  constructor(initialNotes: NoteItemInterface[]) {
    super(initialNotes);
  }

  createNoteAndRedirect(router: Router): void {
    const id = super.createNoteAndGetId();
    router.push(`/${id}`);
  }
}
