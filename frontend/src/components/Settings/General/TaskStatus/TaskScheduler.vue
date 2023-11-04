<script setup>
import { ref } from "vue";
import { convertCronExperssion } from "@/utils/utils";

const props = defineProps(["task"]);
const running = ref(false);
const cronExpression = convertCronExperssion(props.task.CRON);

async function runTask() {
  running.value = true;
  await new Promise(r => setTimeout(r, 3000));
  running.value = false;
}
</script>
<template>
  <v-row no-gutters class="my-3">
    <v-col cols="8">
      <v-icon
        :class="task.ENABLED ? 'text-romm-accent-1' : ''"
        :icon="
          task.ENABLED ? 'mdi-clock-check-outline' : 'mdi-clock-remove-outline'
        "
      />
      <span
        class="font-weight-bold text-body-1 ml-2"
        :class="task.ENABLED ? 'text-romm-accent-1' : ''"
        >{{ task.TITLE }}</span
      >
      <p class="mt-1 ml-8">
        {{ task.MESSAGE }}
        {{ cronExpression }}
      </p>
    </v-col>
    <v-col cols="4">
      <v-btn
        @click="runTask()"
        :loading="running"
        rounded="0"
        size="small"
        class="ml-5 bg-terciary"
        :disabled="!task.ENABLED || running"
        ><v-icon>mdi-console-line</v-icon
        ><template v-slot:loader>
          <v-progress-circular
            color="romm-accent-1"
            :width="2"
            :size="20"
            indeterminate
          /> </template
      ></v-btn>
    </v-col>
  </v-row>
</template>
