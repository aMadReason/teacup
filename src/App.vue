<template>
  <!-- <HelloWorld msg="Hello Vue 3 in CodeSandbox!" /> -->
  <div class="app">
    <GameUI v-if="state.activeUI === 'GameUI'" />
    <CreditsUI v-if="state.activeUI === 'CreditsUI'" />
  </div>
</template>

<script>
import GameUI from "./components/GameUI.vue";
import CreditsUI from "./components/CreditsUI.vue";
import store from "./store";
export default {
  name: "App",
  components: {
    GameUI,
    CreditsUI,
  },
  data: () => ({
    state: store.state,
  }),
};
</script>

<style>
body {
  min-width: 300px;
}
.app {
  height: 100vh;
}
</style>
