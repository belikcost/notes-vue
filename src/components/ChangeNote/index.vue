<template>
  <div>
    <h1 class="change-note_title">Change Note</h1>
    <TextLabel text="Note title">
      <input type="text" v-model="changedNote.title" />
    </TextLabel>
    <div class="change-note_error" v-if="errors.title">
      Check the correctness of the entered title
    </div>
    <div class="change-note__tasks">
      <h3 class="change-note_margin-0">Tasks</h3>
      <template v-for="task in changedNote.tasks" :key="task.id">
        <TaskItem
          :task="task"
          :error="errors.tasks[task.id] || false"
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
      <ManageChangedNote
        :onRemoveNote="onRemoveNote"
        :onExit="onExit"
        :onSaveChanges="onSaveChanges"
      />
    </footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, toRefs } from "vue";
import {
  ChangeNoteInterface,
  NoteItemInterface,
  TaskItemInterface,
} from "@/types";
import TaskItem from "@/components/ChangeNote/Elements/TaskItem/index.vue";
import TextLabel from "@/primitives/TextLabel/index.vue";
import Button from "@/primitives/Button/index.vue";
import { ChangeNoteStateInterface } from "@/components/ChangeNote/types";
import HelpTools from "@/components/ChangeNote/Elements/HelpTools/index.vue";
import "./index.css";
import NoteStore from "@/domain/NoteStore";
import ManageChangedNote from "@/components/ChangeNote/Elements/ManageChangedNote/index.vue";
import NoteValidator from "@/domain/NoteValidator";

export default defineComponent({
  name: "ChangeNote",
  components: {
    TaskItem,
    TextLabel,
    Button,
    HelpTools,
    ManageChangedNote,
  },
  data(): ChangeNoteStateInterface {
    return {
      initialNote: this.note,
      backupChangedNote: null,
      unDoChanges: {
        active: false,
        onUse: () => this.onUndoChanges(),
      },
      returnChanges: {
        active: false,
        onUse: () => this.onReturnChanges(),
      },
      errors: {
        title: false,
        tasks: {},
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
      type: Function as PropType<() => void>,
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

      this.noteStore.createTask(id);
    },
    onChangeTask(changedTask: TaskItemInterface) {
      this.noteStore.changeTask(changedTask);
    },
    onRemoveTask(taskId: TaskItemInterface["id"]) {
      this.noteStore.removeTask(taskId);
    },
    onSaveChanges() {
      const checkChanges =
        this.changedNote.title !== this.initialNote.title ||
        this.changedNote.tasks !== this.initialNote.tasks;

      const noteValidator = new NoteValidator(this.changedNote);
      this.$data.errors = noteValidator.getErrors();

      if (checkChanges && noteValidator.getValid()) {
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
  },
  setup(props) {
    const { note } = toRefs(props);

    const reactiveInstance = reactive({
      noteStore: new NoteStore({ ...note.value }),
    });

    const changedNote = computed({
      get: () => reactiveInstance.noteStore.getNote(),
      set: (value) =>
        (reactiveInstance.noteStore = new NoteStore({ ...value })),
    });

    return {
      noteStore: reactiveInstance.noteStore,
      changedNote,
    };
  },
});
</script>
