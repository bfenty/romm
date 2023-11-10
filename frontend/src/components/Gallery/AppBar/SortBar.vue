<script setup>
import { ref } from "vue";
import storeGallerySorting from "@/stores/gallerySorting";

// Props
const gallerySorting = storeGallerySorting();
const defaultSorting = ref("name");
const sortOptions = ["name", "size"];
</script>

<template>
  <div v-if="gallerySorting.active">
    <v-app-bar
      id="sort-app-bar"
      elevation="0"
      density="compact"
    >
      <v-select
        rounded="0"
        label="Order by"
        item-title="order"
        hide-details
        v-model="defaultSorting"
        :items="sortOptions"
        return-object
      />
      <v-select
        rounded="0"
        label="Filter by"
        item-title="filter"
        hide-details
      />
    </v-app-bar>
  </div>
</template>

<style scoped>
#gallery-app-bar {
  z-index: 999 !important;
}
</style>
