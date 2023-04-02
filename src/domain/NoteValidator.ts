import { NoteItemInterface } from "@/types";
import { ErrorsInterface } from "@/components/ChangeNote/types";

interface NoteValidatorInterface {
  _note: NoteItemInterface;
  _errors: ErrorsInterface;
  validateTitle: () => void;
  validateTasks: () => void;
  getErrors: () => ErrorsInterface;
  getValid: () => boolean;
}

export default class NoteValidator implements NoteValidatorInterface {
  _note: NoteItemInterface;
  _errors: ErrorsInterface;

  constructor(note: NoteItemInterface) {
    this._note = note;
    this._errors = { title: false, tasks: {} };

    this.validateTitle();
    this.validateTasks();
  }

  validateTitle(): void {
    this._errors.title = this._note.title.length === 0;
  }

  validateTasks(): void {
    this._note.tasks.forEach((task) => {
      this._errors.tasks[task.id] = task.name.length === 0;
    });
  }

  getErrors(): ErrorsInterface {
    return this._errors;
  }

  getValid(): boolean {
    if (this._errors.title) return false;

    return !Object.values(this._errors.tasks).some(Boolean);
  }
}
