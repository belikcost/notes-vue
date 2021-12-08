import {
  ChangeNoteInterface,
  NoteItemInterface,
  RemoveNoteInterface,
} from "@/types";

interface NotesStoreInterface {
  _notes: NoteItemInterface[];
  createNote: (noteId: NoteItemInterface["id"]) => void;
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

  constructor(initialNotes: NoteItemInterface[], storage: Storage) {
    try {
      const notesFromStorage = storage.getItem("notes");

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

  createNote(noteId: NoteItemInterface["id"]): void {
    this._notes.push({ id: noteId, ...INITIAL_NOTE });
  }

  changeNote(changedNote: NoteItemInterface): void {
    this._notes = this._notes.map((note) =>
      note.id === changedNote.id ? changedNote : note
    );
  }

  removeNote(noteId: NoteItemInterface["id"]): void {
    this._notes = this._notes.filter((note) => note.id !== noteId);
  }
}
