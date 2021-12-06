import { NoteItemInterface, TaskItemInterface } from "@/types";

const validateNoteTitle = (title: NoteItemInterface["title"]): boolean => {
  let valid = true;

  if (title.length === 0) {
    valid = false;
  }

  return valid;
};

const validateTask = (task: TaskItemInterface): boolean => {
  let valid = true;

  if (task.name.length === 0) {
    valid = false;
  }

  return valid;
};

export { validateNoteTitle, validateTask };
