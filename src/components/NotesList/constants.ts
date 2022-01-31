import { NoteItemInterface } from "@/types";

const INITIAL_NOTES: NoteItemInterface[] = [
  {
    id: 1,
    title: "Tasks on Monday",
    tasks: [
      {
        id: 1,
        name: "Wash a cat",
        completed: false,
      },
      {
        id: 2,
        name: "Call the wholes",
        completed: true,
      },
    ],
  },
  {
    id: 2,
    title: "Tasks on Tuesday",
    tasks: [
      {
        id: 1,
        name: "Go to store",
        completed: true,
      },
      {
        id: 2,
        name: "Kick the wholes",
        completed: false,
      },
    ],
  },
];

export { INITIAL_NOTES };
