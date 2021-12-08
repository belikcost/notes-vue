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

type EventType = Event & {
  key: string;
  target: { value: string; checked: boolean };
};

interface ChangeNoteInterface {
  (note: NoteItemInterface): void;
}

interface RemoveNoteInterface {
  (noteId: NoteItemInterface["id"]): void;
}

interface CreateNoteInterface {
  (): void;
}

export type {
  TaskItemInterface,
  NoteItemInterface,
  EventType,
  ChangeNoteInterface,
  RemoveNoteInterface,
  CreateNoteInterface,
};
