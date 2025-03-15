<script setup lang="ts">
import { ref, watch } from 'vue';

const open = defineModel('open', {
  type: Boolean,
  default: false
})

const props = defineProps<{
  createTask: (task: Task) => void
}>()

const task = ref<Task>({
  name: '',
  description: '',
  done: false,
  createdAt: new Date(),
  updatedAt: new Date()
})

watch(open, (newOpen) => {
  if (newOpen) {
    task.value = {
      name: '',
      description: '',
      done: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
})

function createTaskInternal() {
  task.value.createdAt = new Date()
  task.value.updatedAt = new Date()
  props.createTask(task.value)
  open.value = false
}

</script>
<template>
  <v-navigation-drawer 
    temporary
    v-model="open"
    location="right" 
    width="500" 
    persistent 
  >
    <v-container>
      <div class="text-h4 font-weight-black">Neue Aufgabe</div>
      <p class="pa-md-4">
        <template v-if="task">
          <v-text-field v-model="task.name" label="Zusammenfassung" variant="outlined"></v-text-field>
          <v-textarea v-model="task.description" label="Beschreibung" variant="outlined" rows="4"></v-textarea>
        </template>
        <v-btn variant="outlined" color="success" @click="createTaskInternal()">
          Anlegen
        </v-btn>
        <v-btn variant="outlined" color="error" @click="open = false">
          Abbrechen
        </v-btn>
      </p>
    </v-container>
  </v-navigation-drawer>
</template>
<style scoped>
</style>