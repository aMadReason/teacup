<template>
  <div class="MenuUi text-center full-height">
    <article class="full-height">
      <div class="titlebar full-width">
        <div class="title-text">
          <h1 class="text-center">Menu</h1>
        </div>
      </div>
      <ul class="unstyled">
        <li><router-link to="/game">Game</router-link></li>
        <li><router-link to="/credits">Credits</router-link></li>
      </ul>
    </article>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "UIMenu",
  data: () => ({
    store,
  }),
};
</script>

<style scoped>
</style>
