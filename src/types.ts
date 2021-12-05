interface TaskItemInterface {
  id: number;
  name: string;
  completed: boolean;
}

interface NoteItemInterface {
  id: number;
  title: string;
  tasks: TaskItemInterface[];
}

type EventType = Event & { target: { value: string; checked: boolean } };

interface OnChangeNoteInterface {
  (note: NoteItemInterface): void;
}

export type {
  TaskItemInterface,
  NoteItemInterface,
  EventType,
  OnChangeNoteInterface,
};
