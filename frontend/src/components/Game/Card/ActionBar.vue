<script setup>
import { ref } from "vue";
import api from "@/services/api";
import storeDownload from "@/stores/download";
import storeAuth from "@/stores/auth";
import AdminMenu from "@/components/AdminMenu/Base.vue";

// Props
const props = defineProps(["rom"]);
const saveFiles = ref(false);
const auth = storeAuth();
const downloadStore = storeDownload();
</script>

<template>
  <v-card-text>
    <v-row>
      <v-col class="pa-0">
        <v-btn
          @click="api.downloadRom({ rom })"
          :disabled="downloadStore.value.includes(rom.id)"
          icon="mdi-download"
          size="x-small"
          rounded="0"
          variant="text"
        />
        <v-btn
          icon="mdi-content-save-all"
          size="x-small"
          rounded="0"
          variant="text"
          :disabled="!saveFiles"
        />
      </v-col>

      <v-menu location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            :disabled="!auth.scopes.includes('roms.write')"
            v-bind="props"
            icon="mdi-dots-vertical"
            size="x-small"
            rounded="0"
            variant="text"
          />
        </template>
        <admin-menu :rom="rom" />
      </v-menu>
    </v-row>
  </v-card-text>
</template>
