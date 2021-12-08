import { NoteItemInterface, TaskItemInterface } from "@/types";

type CallbackType = () => void;

interface ModalInterface {
  show: boolean;
  message: null | string;
  confirmCallback: null | CallbackType;
}

type ErrorsByTaskIdType = Record<TaskItemInterface["id"], boolean>;

interface ChangeNoteStateInterface {
  initialNote: Readonly<NoteItemInterface>;
  backupChangedNote: null | NoteItemInterface;
  unDoChanges: HelpToolInterface;
  returnChanges: HelpToolInterface;
}

interface HelpToolInterface {
  active: boolean;
  onUse: () => void;
}

export type { ChangeNoteStateInterface, HelpToolInterface, ErrorsByTaskIdType, ModalInterface };
