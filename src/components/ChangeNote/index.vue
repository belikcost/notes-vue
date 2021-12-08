<template>
  <div>
    <h1 class="change-note_title">Change Note</h1>
    <TextLabel text="Note title">
      <input type="text" v-model="changedNote.title" />
    </TextLabel>
    <div class="change-note_error" v-if="titleError">
      Check the correctness of the entered title
    </div>
    <div class="change-note__tasks">
      <h3 class="change-note_margin-0">Tasks</h3>
      <template v-for="task in changedNote.tasks" :key="task.id">
        <TaskItem
          :task="task"
          :error="errorsByTaskId[task.id]"
          :onChangeTask="onChangeTask"
          :onRemoveTask="() => onRemoveTask(task.id)"
        />
      </template>
      <Button @click="onCreateTask">Create task</Button>
    </div>
    <footer class="change-note__footer">
      <div class="change-note__help-tools">
        <HelpTools :unDoChanges="unDoChanges" :returnChanges="returnChanges" />
      </div>
      <div class="change-note__button-group">
        <Button @click="openExitModal">Exit</Button>
        <Button @click="onSaveChanges">Save</Button>
        <Button @click="openRemoveNoteModal">Remove</Button>
      </div>
    </footer>
    <ConfirmModal
      v-if="modal.show"
      :message="modal.message"
      :confirmEvent="() => $emit(modal.emitName)"
      :resetModal="onResetModal"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  ref,
  toRefs,
} from "vue";
import {
  ChangeNoteInterface,
  NoteItemInterface,
  TaskItemInterface,
  RemoveNoteInterface,
} from "@/types";
import TaskItem from "@/components/ChangeNote/Elements/TaskItem/index.vue";
import TextLabel from "@/primitives/TextLabel/index.vue";
import Button from "@/primitives/Button/index.vue";
import ConfirmModal from "@/components/ChangeNote/Elements/ConfirmModal/index.vue";
import {
  ChangeNoteStateInterface,
  ErrorsByTaskIdType,
} from "@/components/ChangeNote/types";
import HelpTools from "@/components/ChangeNote/Elements/HelpTools/index.vue";
import "./index.css";
import { validateNoteTitle, validateTask } from "@/utils";
import NoteStorage from "@/entites/NoteStorage";
import { getErrorsByTaskId } from "./utils";

const INITIAL_MODAL = {
  show: false,
  message: null,
  emitName: null,
};

export default defineComponent({
  name: "ChangeNote",
  components: {
    TaskItem,
    TextLabel,
    Button,
    ConfirmModal,
    HelpTools,
  },
  data(): ChangeNoteStateInterface {
    return {
      initialNote: this.note,
      backupChangedNote: null,
      modal: INITIAL_MODAL,
      unDoChanges: {
        active: false,
        onUse: () => this.onUndoChanges(),
      },
      returnChanges: {
        active: false,
        onUse: () => this.onReturnChanges(),
      },
    };
  },
  props: {
    note: {
      type: Object as PropType<NoteItemInterface>,
      required: true,
    },
    onChangeNote: {
      type: Function as PropType<ChangeNoteInterface>,
      required: true,
    },
    onRemoveNote: {
      type: Function as PropType<RemoveNoteInterface>,
      required: true,
    },
    onExit: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  methods: {
    onCreateTask() {
      const id = Math.floor(Math.random() * 100);

      this.NoteStorage.createTask(id);
      this.errorsByTaskId[id] = false;
    },
    onChangeTask(changedTask: TaskItemInterface) {
      this.NoteStorage.changeTask(changedTask);
    },
    onRemoveTask(taskId: TaskItemInterface["id"]) {
      this.NoteStorage.removeTask(taskId);
    },
    openRemoveNoteModal() {
      this.$data.modal = {
        show: true,
        message: "Do you really want to remove this note?",
        emitName: "removeNote",
      };
    },
    openExitModal() {
      this.$data.modal = {
        show: true,
        message: "Do you really want to exit?",
        emitName: "exit",
      };
    },
    onResetModal() {
      this.$data.modal = INITIAL_MODAL;
    },
    onSaveChanges() {
      const checkChanges =
        this.changedNote.title !== this.initialNote.title ||
        this.changedNote.tasks !== this.initialNote.tasks;

      const checkChangesValid = this.validateChanges(this.changedNote);

      if (checkChanges && checkChangesValid) {
        this.onChangeNote(this.changedNote);
        this.$data.unDoChanges.active = true;
      }
    },
    onUndoChanges() {
      this.onChangeNote(this.initialNote);

      this.$data.backupChangedNote = this.changedNote;
      this.changedNote = this.initialNote;

      this.$data.unDoChanges.active = false;
      this.$data.returnChanges.active = true;
    },
    onReturnChanges() {
      if (this.backupChangedNote) {
        this.changedNote = this.backupChangedNote;
        this.$data.backupChangedNote = null;

        this.onSaveChanges();
        this.$data.returnChanges.active = false;
      }
    },
    validateChanges(note: NoteItemInterface) {
      let valid = true;

      if (validateNoteTitle(note.title)) {
        this.titleError = false;
      } else {
        this.titleError = true;
        valid = false;
      }

      note.tasks.forEach((task) => {
        if (validateTask(task)) {
          this.errorsByTaskId[task.id] = false;
        } else {
          this.errorsByTaskId[task.id] = true;
          valid = false;
        }
      });

      return valid;
    },
  },
  setup(props) {
    const errorsByTaskId: ErrorsByTaskIdType = reactive(
      getErrorsByTaskId(props.note.tasks)
    );
    const titleError = ref(false);

    const { note } = toRefs(props);
    const reactiveInstance = reactive({
      noteStorage: new NoteStorage({ ...note.value }),
    });

    const changedNote = computed({
      get: () => reactiveInstance.noteStorage.getNote(),
      set: (value) =>
        (reactiveInstance.noteStorage = new NoteStorage({ ...value })),
    });

    return {
      NoteStorage: reactiveInstance.noteStorage,
      changedNote,
      titleError,
      errorsByTaskId,
    };
  },
});
</script>
