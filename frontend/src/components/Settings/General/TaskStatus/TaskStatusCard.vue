<script setup>
import { ref, onBeforeMount } from "vue";
import { api } from "@/services/api";
import TaskWatcher from "@/components/Settings/General/TaskStatus/TaskWatcher.vue";
import TaskScheduler from "@/components/Settings/General/TaskStatus/TaskScheduler.vue";

// Props
const watcher = ref({});
const scheduler = ref({});

onBeforeMount(async () => {
  const { data } = await api.get("/heartbeat");
  watcher.value = data.WATCHER;
  scheduler.value = data.SCHEDULER;
});
</script>
<template>
  <v-card rounded="0">
    <v-toolbar class="bg-terciary" density="compact">
      <v-toolbar-title class="text-button">
        <v-icon class="mr-3">mdi-pulse</v-icon>
        Task Status
      </v-toolbar-title>
    </v-toolbar>

    <v-divider class="border-opacity-25" />

    <v-card-text>
      <v-row no-gutters>
        <task-watcher :watcher="watcher" />
      </v-row>
      <v-divider class="border-opacity-25 my-6" />
      <v-row no-gutters>
        <v-col
          v-for="task in scheduler"
          cols="12"
          md="4"
          sm="6"
          lg="4"
          xl="4"
          :class="{
            'status-item d-flex': true,
            disabled: !task.ENABLED,
          }"
        >
          <v-divider :vertical="true" class="mr-6 my-2" />
          <task-scheduler :task="task" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.status-item.disabled {
  opacity: 0.5;
}
</style>
