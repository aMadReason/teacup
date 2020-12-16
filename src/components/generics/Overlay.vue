<template>
  <div ref="root" role="dialog" :data-open="open">
    <div class="outer" aria-hidden="true" role="presentation"></div>

    <div
      tabindex="0"
      class="inner"
      @keydown.tab="$emit('taboverlay', $event)"
      @keydown.esc="$emit('escapeoverlay', $event)"
    >
      <div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Overlay",
  props: ["open"],
  emits: ["escapeoverlay", "taboverlay"],
  methods: {
    getFocusables() {
      const focusables = this.$refs.root.querySelectorAll(
        "a, input, button, textarea, [tabindex='0'], [contenteditable='true']"
      );
      return [...[].slice.call(focusables)];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
[role="dialog"] {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: all 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  z-index: 9999;
}

[role="dialog"][data-open="true"] {
  transition: all 0.5s;
  opacity: 1;
  pointer-events: all;
}

.outer {
  background: #111111;
  opacity: 0.9;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  left: 0;
  top: 0;
}

.inner {
  padding: 1rem 0;
  width: 100%;
  height: 100%;
  max-width: var(--tea-modal-maxwidth, 85%);
  max-height: var(--tea-modal-maxheight, 85%);
  box-sizing: border-box;
  background: var(--tea-bg-1, white);
  color: var(--tea-fg-1, white);
  border-radius: 5px;
}

.inner .control {
  display: flex;
  border-bottom: 1px solid grey;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.inner .control > div {
  flex-basis: 100%;
}

.inner > div {
  padding: 0 1rem;
  height: 100%;
  overflow-y: auto;
}

/* Medium devices (tablets, 768px and up) */
@media screen and (min-width: 768px) and (orientation: landscape) {
  .inner {
    max-width: 60%;
    max-width: var(--tea-med-modal-maxwidth, 60%);
    max-height: 70%;
    max-height: var(--tea-med-modal-maxheight, 70%);
  }
}

/* Large devices (desktops, 992px and up) */
@media screen and (min-width: 992px) and (orientation: landscape) {
  .inner {
    max-width: 50%;
    max-width: var(--tea-med-modal-maxwidth, 50%);
    max-height: 50%;
    max-height: var(--tea-med-modal-maxheight, 50%);
  }
}
</style>
