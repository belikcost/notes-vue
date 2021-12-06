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
        <TaskItem :task="task" @changeTask="onChangeTask" />
        <div class="change-note_error" v-if="errorsByTaskId[task.id]">
          Check the correctness of the entered data
        </div>
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
import { defineComponent, PropType } from "vue";
import {
  OnChangeNoteInterface,
  NoteItemInterface,
  TaskItemInterface,
  OnRemoveNoteInterface,
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

const INITIAL_MODAL = {
  show: false,
  message: null,
  emitName: null,
};

const INITIAL_TASK = {
  name: "",
  completed: false,
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
      changedNote: { ...this.note },
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
      errorsByTaskId: this.getErrorsByTaskId(this.note.tasks),
      titleError: false,
    };
  },
  props: {
    note: {
      type: Object as PropType<NoteItemInterface>,
      required: true,
    },
    onChangeNote: {
      type: Function as PropType<OnChangeNoteInterface>,
      required: true,
    },
    onRemoveNote: {
      type: Function as PropType<OnRemoveNoteInterface>,
      required: true,
    },
    onExit: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  methods: {
    onChangeTask(newTask: TaskItemInterface) {
      this.$data.changedNote.tasks = this.$data.changedNote.tasks.map((task) =>
        task.id === newTask.id ? newTask : task
      );
    },
    openRemoveNoteModal() {
      this.$data.modal = {
        show: true,
        message: "Do you really want to remove this note?",
        emitName: "removeNote",
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
      this.$data.changedNote = this.initialNote;

      this.$data.unDoChanges.active = false;
      this.$data.returnChanges.active = true;
    },
    onReturnChanges() {
      if (this.backupChangedNote) {
        this.$data.changedNote = this.backupChangedNote;
        this.$data.backupChangedNote = null;

        this.onSaveChanges();
        this.$data.returnChanges.active = false;
      }
    },
    openExitModal() {
      this.$data.modal = {
        show: true,
        message: "Do you really want to exit?",
        emitName: "exit",
      };
    },
    onCreateTask() {
      const id = Math.floor(Math.random() * 100);

      this.$data.changedNote.tasks = [
        ...this.$data.changedNote.tasks,
        { id, ...INITIAL_TASK },
      ];
    },
    getErrorsByTaskId(tasks: TaskItemInterface[]) {
      const result: ErrorsByTaskIdType = {};

      tasks.forEach((task) => {
        result[task.id] = false;
      });

      return result;
    },
    validateChanges(note: NoteItemInterface) {
      let valid = true;

      if (note.title.length === 0) {
        this.$data.titleError = true;
        valid = false;
      } else {
        this.$data.titleError = false;
      }

      note.tasks.forEach((task) => {
        if (task.name.length === 0) {
          this.$data.errorsByTaskId[task.id] = true;
          valid = false;
        } else {
          this.$data.errorsByTaskId[task.id] = false;
        }
      });

      return valid;
    },
  },
});
</script>
