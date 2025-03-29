import { Task } from "../database/TaskDatabase";

function hasTaskChanged(task1: Task, task2: Task): boolean {
  return task1.name !== task2.name || task1.description !== task2.description || task1.done !== task2.done
}

export { hasTaskChanged };