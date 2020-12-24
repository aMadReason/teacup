<template>
  <ul class="menucontent unstyled">
    <li>
      <button
        @click="(e) => store.switchActiveUI(e, 'CreditsUI')"
        class="button"
      >
        Credits
      </button>
    </li>
  </ul>
</template>

<script>
import store from "../store";
export default {
  name: "MenuContent",
  data: () => ({
    store,
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menucontent {
  width: 100%;
  display: flex;
  flex-flow: column;
}

.menucontent > * {
  padding: 4px calc(var(--tea-spacing) / 2);
}

.menucontent button.button {
  width: 100%;
}
</style>
