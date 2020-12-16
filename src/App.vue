<template>
  <!-- <HelloWorld msg="Hello Vue 3 in CodeSandbox!" /> -->
  <GameUI />
</template>

<script>
import GameUI from "./components/GameUI.vue";
export default {
  name: "App",
  components: {
    GameUI,
  },
};
</script>

<style>
body {
  min-width: 300px;
  overflow: hidden;
}
#app {
  height: 100%;
}
</style>
