import { NoteItemInterface } from "@/types";

interface ModalInterface {
  show: boolean;
  message: null | string;
  emitName: null | string;
}

interface ChangeNoteStateInterface {
  changedNote: NoteItemInterface;
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

export type { ChangeNoteStateInterface, HelpToolInterface };
