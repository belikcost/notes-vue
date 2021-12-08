import { TaskItemInterface } from "@/types";
import { ErrorsByTaskIdType } from "@/components/ChangeNote/types";

const getErrorsByTaskId = (tasks: TaskItemInterface[]): ErrorsByTaskIdType => {
  const result: ErrorsByTaskIdType = {};

  tasks.forEach((task) => {
    result[task.id] = false;
  });

  return result;
};

export { getErrorsByTaskId };
