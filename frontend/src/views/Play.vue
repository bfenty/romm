<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchRomApi } from "@/services/api.js";

const route = useRoute();
const rom = ref(undefined);
const gameRunning = ref(false);

const script = document.createElement("script");
script.src = "/assets/emulatorjs/loader.js";
script.async = true;

window.EJS_player = "#game";
window.EJS_core = route.params.platform;
window.EJS_pathtodata = "/assets/emulatorjs/";
window.EJS_color = "#A453FF";
window.EJS_defaultOptions = {
  "save-state-location": "browser",
};

// window.EJS_onSaveState = function ({ screenshot, state }) {
//   // Save to backend as .state file
// };

// window.EJS_onLoadState = function () {
//   // Load the latest state from file
// };

window.EJS_onGameStart = () => {
  gameRunning.value = true;
};

// Other config options to investigate:
// config.loadState = window.EJS_loadStateURL; // https://emulatorjs.org/docs/Options.html#ejs-loadstateurl
// config.cheats = window.EJS_cheats; // https://emulatorjs.org/docs/Options.html#ejs-cheats
// config.gamePatchUrl = window.EJS_gamePatchUrl; // https://emulatorjs.org/docs/Options.html#ejs-gamepatchurl
// config.netplayUrl = window.EJS_netplayServer; // https://emulatorjs.org/docs4devs/Netplay.html

onMounted(() => {
  fetchRomApi(route.params.platform, route.params.rom)
    .then((response) => {
      rom.value = response.data;
      window.EJS_gameID = rom.value.id;
      window.EJS_gameName = rom.value.name;
      // window.EJS_backgroundImage = `/assets/romm/resources/${rom.value.path_cover_l}`;
      window.EJS_gameUrl = rom.value.download_path;
      document.body.appendChild(script);
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<template>
  <v-col v-if="!gameRunning" class="v-col-4 offset-4">
    <v-select clearable label="Save" :items="['Advance Wars.srm']" />
    <v-select
      clearable
      label="State"
      :items="['Advance Wars.state', 'Advance Wars (2).state']"
    />
    <v-select clearable label="BIOS" :items="['gba-bios.zip']" />
    <v-select
      clearable
      label="Patch"
      :items="[
        'Advance Wars Balance (AW1) by Kartal',
        'War Room Sturm (AW1) by Kartal',
      ]"
    />
  </v-col>
  <div id="game-wrapper" :class="{ running: gameRunning }">
    <div id="game"></div>
  </div>
</template>

<style>
div.ejs_game {
  background-color: #0d1117;
}

#game-wrapper {
  height: 80px;
  width: 200px;
  margin: auto;
}

#game-wrapper.running {
  height: 100%;
  width: 100%;
  margin: 0;
}
</style>
