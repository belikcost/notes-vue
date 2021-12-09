import { NoteItemInterface, TaskItemInterface } from "@/types";

type CallbackType = () => void;

interface ModalInterface {
  show: boolean;
  message: null | string;
  confirmCallback: null | CallbackType;
}

interface ErrorsInterface {
  title: boolean;
  tasks: Record<TaskItemInterface["id"], boolean>;
}

interface ChangeNoteStateInterface {
  initialNote: Readonly<NoteItemInterface>;
  backupChangedNote: null | NoteItemInterface;
  unDoChanges: HelpToolInterface;
  returnChanges: HelpToolInterface;
  errors: ErrorsInterface;
}

interface HelpToolInterface {
  active: boolean;
  onUse: () => void;
}

export type {
  ErrorsInterface,
  ChangeNoteStateInterface,
  HelpToolInterface,
  ModalInterface,
};
