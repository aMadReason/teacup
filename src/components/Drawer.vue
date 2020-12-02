<template>
  <div
    @keydown.esc="$emit('escapedrawer', $event)"
    @keydown.tab="$emit('tabdrawer', $event)"
    class="drawer"
    v-bind:data-open="open"
    v-bind:data-position="position"
  >
    <div class="inner">
      <slot></slot>
    </div>
  </div>
  <div
    @click="$emit('clickoverlay', $event)"
    @keydown.esc="$emit('escapedrawer', $event)"
    v-bind:data-overlay="overlay"
    v-bind:data-open="open"
    class="overlay"
    aria-hidden="true"
    role="presentation"
  ></div>
</template>

<script>
export default {
  name: "Drawer",
  emits: ["escapedrawer", "clickoverlay", "tabdrawer"],
  computed: {},
  props: {
    open: { type: Boolean, default: false },
    position: { type: String, default: "left" },
    overlay: { type: Boolean, default: true },
  },
  data: () => ({}),
  methods: {
    getFocusables() {
      const focusables = this.$refs.root.querySelectorAll(
        "a, input, button, textarea, [tabindex='0'], [contenteditable='true']"
      );
      return [].slice.call(focusables);
    },
    checkTab(e) {
      const { explicitOriginalTarget: target } = e;
      const focusables = this.getFocusables();

      if (focusables.length === 0) return undefined;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const isLast = target === last && !e.shiftKey;
      const isFirst = target === first && e.shiftKey;

      if (isFirst || isLast) e.preventDefault();
      if (isLast) first.focus();
      if (isFirst) last.focus();
    },
    udated() {
      this.$nextTick(function () {
        console.log("moo");
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.drawer {
  position: fixed;
  top: 0;
  background: var(--tea-bg-3, #fff);
  width: var(--tea-menu-width, 100%);
  max-width: var(--tea-menu-maxwidth, initial);
  min-width: var(--tea-menu-minwidth, initial);
  height: var(--tea-menu-height, 100%);
  max-height: var(--tea-menu-maxheight, initial);
  min-height: var(--tea-menu-minheight, initial);
  margin: 0;
  z-index: 999;
  overflow-y: hidden;
  will-change: transform;
  backface-visibility: hidden;
  transition: var(--tea-menu-transition, transform 300ms ease);
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),
    0 2px 4px -1px rgba(0, 0, 0, 0.3);
}
.drawer[data-position="left"] {
  left: 0;
  transform: translateX(-105%);
  overflow-y: auto;
}
.drawer[data-position="right"] {
  right: 0;
  transform: translateX(105%);
  overflow-y: auto;
}
.drawer[data-position="top"] {
  left: 0;
  transform: translateY(-105%);
  max-width: var(--tea-menu-maxwidth, 100%);
  max-height: var(--tea-menu-maxheight, 100%);
  overflow-x: auto;
}
.drawer[data-position="bottom"] {
  top: auto;
  bottom: 0;
  right: 0;
  transform: translateY(105%);
  max-width: var(--tea-menu-maxwidth, 100%);
  max-height: var(--tea-menu-maxheight, 100%);
  overflow-x: auto;
}
.drawer[data-open="true"] {
  transform: translateX(0%);
}

:host button.close {
  float: right;
  border: 0;
  font-size: 1rem;
  font-weight: bold;
  min-height: 30px;
  min-width: 30px;
  margin: 3px;
  color: var(--tea-txt-2, #333);
  border-radius: 100%;
  border: 2px solid transparent;
  transition: border 0.3s ease, background 0.5s ease;
  background: transparent;
}
.drawer[data-open] button.close:hover {
  cursor: pointer;
  background: var(--tea-bg-2, #ddd);
}
.drawer[data-open] button.close:focus {
  cursor: pointer;
  border: 2px solid var(--tea-txt-2, #333);
}

.overlay[data-open][data-overlay="true"] {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
  height: 100%;
  height: calc(100% + 60px);
  height: -moz-calc(100%);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 997;
  display: block;
  width: 100%;
  pointer-events: none;
  transition: var(--tea-overlay-transition, all 0.5s 0 ease);
}
.overlay[data-open="true"][data-overlay="true"] {
  opacity: 1;
  pointer-events: all;
}

/* Medium devices (tablets, 768px and up) */
@media screen and (min-width: 768px) {
  .drawer[data-position="left"],
  .drawer[data-position="right"] {
    --tea-menu-maxwidth: 50%;
    --tea-menu-minwidth: 50%;
    --tea-menu-maxheight: 100%;
    --tea-menu-minheight: 100%;
  }
  .drawer[data-position="top"],
  .drawer[data-position="bottom"] {
    --tea-menu-maxwidth: 100%;
    --tea-menu-minwidth: 100%;
    --tea-menu-maxheight: 50%;
    --tea-menu-minheight: 50%;
  }
}

/* Large devices (desktops, 992px and up) */
@media screen and (min-width: 992px) and (orientation: landscape) {
  .drawer[data-position="left"],
  .drawer[data-position="right"] {
    --tea-menu-maxwidth: 25%;
    --tea-menu-minwidth: 25%;
    --tea-menu-maxheight: 100%;
    --tea-menu-minheight: 100%;
  }
  .drawer[data-position="top"],
  .drawer[data-position="bottom"] {
    --tea-menu-maxwidth: 100%;
    --tea-menu-minwidth: 100%;
    --tea-menu-maxheight: 25%;
    --tea-menu-minheight: 25%;
  }
}
</style>
