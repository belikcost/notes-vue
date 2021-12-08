import { NoteItemInterface, TaskItemInterface } from "@/types";

interface NoteStorageInterface {
  _note: NoteItemInterface;
  getNote: () => NoteItemInterface;
  createTask: (taskId: TaskItemInterface["id"]) => void;
  removeTask: (taskId: TaskItemInterface["id"]) => void;
  changeTask: (changedTask: TaskItemInterface) => void;
}

const INITIAL_TASK = {
  name: "",
  completed: false,
};

export default class NoteStorage implements NoteStorageInterface {
  _note: NoteItemInterface;

  constructor(changedNote: NoteItemInterface) {
    this._note = changedNote;
  }

  getNote(): NoteItemInterface {
    return this._note;
  }

  createTask(taskId: TaskItemInterface["id"]): void {
    this._note.tasks = [...this._note.tasks, { ...INITIAL_TASK, id: taskId }];
  }

  removeTask(taskId: TaskItemInterface["id"]): void {
    this._note.tasks = this._note.tasks.filter((task) => task.id !== taskId);
  }

  changeTask(newTask: TaskItemInterface): void {
    this._note.tasks = this._note.tasks.map((task) =>
      task.id === newTask.id ? newTask : task
    );
  }
}
