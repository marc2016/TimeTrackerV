<script setup lang="ts">

import { ref, watch } from 'vue'
import { mdiPlus } from '@mdi/js'
import taskDb from '../database/TaskDatabase'
import TaskView from '../components/TaskView.vue'

// const tasks = ref<Task[]>(await taskDb.tasks.toArray())
const allTasks = await taskDb.tasks.toArray()
const openTasks = ref<Task[]>(allTasks.filter(task => !task.done))
const doneTasks = ref<Task[]>(allTasks.filter(task => task.done))

async function addTask() {
  const newTaskId = await taskDb.tasks.add(
    {
      name: '',
      description: '',
      done: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  )
  const newTask = await taskDb.tasks.get(newTaskId)
  openTasks.value.push(newTask!)
}

function openTaskDetails(task: Task) {
  drawer.value = !drawer.value
  selectedTask.value = task
}

function doneTask(task: Task) {
  task.done = true
  openTasks.value.splice(openTasks.value.indexOf(task), 1)
  doneTasks.value.unshift(task)
}

function reopenTask(task: Task) {
  task.done = false
  doneTasks.value.splice(doneTasks.value.indexOf(task), 1)
  openTasks.value.unshift(task)
}

function deleteTask(task: Task) {
  if (task.done) {
    const index = doneTasks.value.indexOf(task)
    doneTasks.value.splice(index, 1)
  } else {
    const index = openTasks.value.indexOf(task)
    openTasks.value.splice(index, 1)
  }
  if (task.id) {
    taskDb.tasks.delete(task.id)
  }
}

const drawer = ref(false)
const selectedTask = ref<Task | null>(null)

{
  const { pause, resume } = watch(openTasks, async (newTasks) => {
    pause()
    for (const task of newTasks) {
      if (task.id) {
        
        task.updatedAt = new Date()
        await taskDb.tasks.update(task.id, task)
      }
    }
    resume()
  }, { deep: true })
}


{
  const { pause, resume } = watch(doneTasks, async (newTasks) => {
    pause()
    for (const task of newTasks) {
      if (task.id) {
        task.updatedAt = new Date()
        await taskDb.tasks.update(task.id, task)
        
      }
    }
    resume()
  }, { deep: true })
}


</script>

<template>
  <Suspense>
    <template #default>
      <div>
        <v-navigation-drawer temporary v-model="drawer" location="right" width="500">
          <v-container>
            <div class="text-h4 font-weight-black">Aufgabendetails</div>
            <p class="pa-md-4">
              <template v-if="selectedTask">
                <v-text-field v-model="selectedTask.name" label="Zusammenfassung" variant="outlined"></v-text-field>
                <v-textarea v-model="selectedTask.description" label="Beschreibung" variant="outlined" rows="4"></v-textarea>
              </template>
            </p>
          </v-container>
        </v-navigation-drawer>
        <transition-group name="list" tag="v-list" class="task-list d-flex flex-wrap">
          <template v-for="(task) in openTasks" :key="task.id" class="d-flex flex-wrap">
            <v-list-item>
              <TaskView :task="task" :doneTask="doneTask" :reopenTask="reopenTask" :openTaskDetails="openTaskDetails" :deleteTask="deleteTask"></TaskView>
            </v-list-item>
          </template>
          <v-divider color="darkgray" class="border-opacity-100 mt-8 mb-8"></v-divider>
          <template v-for="(task) in doneTasks" :key="task.id" class="d-flex flex-wrap">
            <v-list-item>
              <TaskView :task="task" :doneTask="doneTask" :reopenTask="reopenTask" :openTaskDetails="openTaskDetails" :deleteTask="deleteTask"></TaskView>
            </v-list-item>
          </template>
        </transition-group>
        
        <v-fab :icon="mdiPlus" class="fab-button" @click="addTask"></v-fab>
      </div>
    </template>
    <template #fallback></template>
  </Suspense>
</template>

<style scoped>
.task-list {
  background-color: transparent;
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
}

.d-flex {
  display: flex;
}
.flex-column {
  flex-direction: column;
}
.flex-grow-1 {
  flex-grow: 1;
}
.flex-row {
  flex-direction: row;
}
.align-center {
  align-items: center;
}
.fab-button {
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 1000;
}
.card-max-width {
  width: 300px;
}
.card-max-height {
  height: 200px; /* Set the maximum height for the card */
  overflow: hidden; /* Hide overflow content */
}
.multiline-title {
  white-space: normal;
  word-wrap: break-word;
}
.multiline-text {
  white-space: pre-wrap; /* Respect new lines */
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit the number of lines */
  -webkit-box-orient: vertical;
}
.full-height {
  height: 100%;
}
.card-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>