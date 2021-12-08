import { NoteItemInterface, TaskItemInterface } from "@/types";

interface ModalInterface {
  show: boolean;
  message: null | string;
  emitName: null | string;
}

type ErrorsByTaskIdType = Record<TaskItemInterface["id"], boolean>;

interface ChangeNoteStateInterface {
  initialNote: Readonly<NoteItemInterface>;
  backupChangedNote: null | NoteItemInterface;
  modal: ModalInterface;
  unDoChanges: HelpToolInterface;
  returnChanges: HelpToolInterface;
}

interface HelpToolInterface {
  active: boolean;
  onUse: () => void;
}

export type { ChangeNoteStateInterface, HelpToolInterface, ErrorsByTaskIdType };
