<template>
  <div>
    <div class="titlebar full-width">
      <div class="title-text">
        <h1 class="text-center">Modal</h1>
      </div>
      <button @click="closeOverlay()" class="button" aria-label="close">
        X
      </button>
    </div>

    <div v-if="s.overlayKey === 'start:one'"></div>
    <div v-if="s.overlayKey === 'start:two'">two</div>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "OverlayContent",
  data: () => ({
    s: store.state,
  }),
  methods: {
    switchOverlayKey(key) {
      store.state.overlayKey = key;
    },
    closeOverlay() {
      store.state.overlay = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.titlebar {
  display: flex;
  padding: 0.5rem;
  align-items: center;
  border-bottom: 1px solid var(--tea-bg-2);
}

.titlebar .title-text {
  flex-basis: 100%;
}

.titlebar .title-text.more {
  display: flex;
}
</style>
