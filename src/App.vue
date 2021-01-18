<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import store from "./store";
export default {
  name: "App",
  components: {},
  data: () => ({
    store,
    state: store.state,
  }),
  methods: {},
};
</script>

<style>
body {
  min-width: 300px;
}
.app {
  height: 100vh;
}
.menu {
  background: var(--tea-bg-3);
}
</style>
