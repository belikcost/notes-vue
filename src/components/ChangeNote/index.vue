<template>
  <div>
    <h1 class="change-note_title">Change Note</h1>
    <TextLabel text="Note title">
      <input type="text" v-model="changedNote.title" />
    </TextLabel>
    <div class="change-note__tasks">
      <h3 class="change-note_margin-0">Tasks</h3>
      <template v-for="task in changedNote.tasks" :key="task.id">
        <TaskItem :task="task" @changeTask="onChangeTask" />
      </template>
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
import { ChangeNoteStateInterface } from "@/components/ChangeNote/types";
import HelpTools from "@/components/ChangeNote/Elements/HelpTools/index.vue";

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

      if (checkChanges) {
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
  },
});
</script>

<style scoped>
.change-note_title {
  text-align: center;
}

.change-note_margin-0 {
  margin: 0;
}

.change-note__tasks {
  margin-top: 50px;
}

.change-note__footer {
  margin: 50px auto 0;
}

.change-note__button-group {
  display: flex;
  justify-content: space-around;
}

.change-note__help-tools {
  margin: 10px 0;
}
</style>
