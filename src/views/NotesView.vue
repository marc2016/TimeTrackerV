<script setup lang="ts">
import Menu from 'primevue/menu';
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'

import { ref } from 'vue'

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        root: true,
        route: "home"
      },
    {
        label: 'Aufgaben',
        icon: 'pi pi-check-circle',
        root: true,
        route: "tasks"
    },
    {
        label: 'Notizen',
        icon: 'pi pi-book',
        root: true,
        route: "tasks"
    }
]);

</script>

<template>
  
  <div>
    <div class="row">
      <div class="col">
        <Menu :model="items" />
      </div>
      <div class="col-10">
        Column
      </div>
    </div>
  </div>
</template>
