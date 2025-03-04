<script setup lang="ts">
import { mdiRecordCircleOutline, mdiTrashCan, mdiCheckCircleOutline } from '@mdi/js'

defineProps<{ 
  task: Task,
  openTaskDetails: (task: Task) => void,
  reopenTask: (task: Task) => void,
  doneTask: (task: Task) => void,
  deleteTask: (task: Task) => void
}>()

</script>

<template>
  <v-card outlined hover link @click="openTaskDetails(task)" class="card-max-width card-max-height d-flex flex-column bg-grey-lighten-4" >
    <transition name="fade">
      <v-icon v-if="task.done" :icon="mdiCheckCircleOutline" size="200" class="background-icon text-green-lighten-4"></v-icon>
      <v-icon v-else :icon="mdiRecordCircleOutline" size="200" class="background-icon text-orange-lighten-4"></v-icon>
    </transition>
    <v-card-title class="multiline-title">{{ task.name }}</v-card-title>
    <v-card-text class="flex-grow-1 multiline-text">{{ task.description }}</v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="card-actions bg-white" @click.stop>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!task.done"
        color="medium-emphasis"
        :icon="mdiCheckCircleOutline"
        size="small"
        @click.stop
        @click="doneTask(task)"
      ></v-btn>
      <v-btn
        v-if="task.done"
        color="medium-emphasis"
        :icon="mdiRecordCircleOutline"
        size="small"
        @click.stop
        @click="reopenTask(task)"
      ></v-btn>

      <v-btn
        color="medium-emphasis"
        :icon="mdiTrashCan"
        size="small"
        @click.stop
        @click="deleteTask(task)"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.background-icon {
  position: absolute;
  top: 50%;
  left: 85%;
  transform: translate(-50%, -50%);
  z-index: -1; /* Ensure it is behind other elements */
}
.card-max-width {
  position: relative; /* Ensure the icon is positioned relative to the card */
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>