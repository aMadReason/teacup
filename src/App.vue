<template>
  <!-- <HelloWorld msg="Hello Vue 3 in CodeSandbox!" /> -->
  <GameUI />
</template>

<script>
import GameUI from "./pages/GameUI.vue";
export default {
  name: "App",
  components: {
    GameUI,
  },
};
</script>

<style>
#app {
  height: 100%;
}
</style>
