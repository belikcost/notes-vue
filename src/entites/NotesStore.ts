import {
  ChangeNoteInterface,
  NoteItemInterface,
  RemoveNoteInterface,
} from "@/types";

interface NotesStoreInterface {
  _notes: NoteItemInterface[];
  createNoteAndGetId: () => NoteItemInterface["id"];
  changeNote: ChangeNoteInterface;
  removeNote: RemoveNoteInterface;
  getNotes: () => NoteItemInterface[];
}

const INITIAL_NOTE = {
  title: "",
  tasks: [],
};

export default class NotesStore implements NotesStoreInterface {
  _notes: NoteItemInterface[];

  constructor(initialNotes: NoteItemInterface[]) {
    try {
      const notesFromStorage = localStorage.getItem("notes");

      if (notesFromStorage) {
        this._notes = JSON.parse(notesFromStorage);
      } else {
        this._notes = initialNotes;
      }
    } catch (e) {
      this._notes = initialNotes;
    }
  }

  getNotes(): NoteItemInterface[] {
    return this._notes;
  }

  createNoteAndGetId(): NoteItemInterface["id"] {
    const id = Math.floor(Math.random() * 100);

    this._notes.push({ id, ...INITIAL_NOTE });

    return id;
  }

  changeNote(changedNote: NoteItemInterface): void {
    this._notes = this._notes.map((note) =>
      note.id === changedNote.id ? changedNote : note
    );
  }

  removeNote(noteId: NoteItemInterface["id"]): void {
    console.log(noteId);
    this._notes = this._notes.filter((note) => note.id !== noteId);
  }
}
