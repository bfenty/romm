<script setup>
import storeGallerySorting from "@/stores/gallerySorting";
import { inject } from "vue";

// Props
const emitter = inject("emitter");
const gallerySorting = storeGallerySorting();
</script>

<template>
    <v-btn
      @click="gallerySorting.active = !gallerySorting.active"
      rounded="0"
      variant="text"
      class="mr-0"
      icon="mdi-filter"
      :class="{'bg-romm-accent-1': gallerySorting.active}"
    />
</template>