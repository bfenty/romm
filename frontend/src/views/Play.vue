<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchRomApi } from "@/services/api.js";

const route = useRoute();
const rom = ref(undefined);

const script = document.createElement("script");
script.src = "/assets/emulatorjs/loader.js";
script.async = true;

window.EJS_player = "#game";
window.EJS_core = route.params.platform;
window.EJS_pathtodata = "/assets/emulatorjs/";
window.EJS_color = "#A453FF";
window.EJS_defaultOptions = {
    'save-state-location': 'browser'
}

// window.EJS_onSaveState = function ({ screenshot, state }) {
//   debugger;
// };

// window.EJS_onLoadState = function () {
//   debugger;
// };

// Other config options to investigate:
// config.filePaths = window.EJS_paths;
// config.loadState = window.EJS_loadStateURL;
// config.cheats = window.EJS_cheats;
// config.gamePatchUrl = window.EJS_gamePatchUrl;
// config.gameParentUrl = window.EJS_gameParentUrl;
// config.netplayUrl = window.EJS_netplayServer;

onMounted(() => {
  fetchRomApi(route.params.platform, route.params.rom)
    .then((response) => {
      rom.value = response.data;
      window.EJS_gameID = rom.value.id;
      window.EJS_gameName = rom.value.name;
      window.EJS_backgroundImage = `/assets/romm/resources/${rom.value.path_cover_l}`;
      window.EJS_gameUrl = rom.value.download_path;
      document.body.appendChild(script);
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<template>
  <div style="width: 100%; height: 100%">
    <div id="game"></div>
  </div>
</template>
