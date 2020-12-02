<template>
  <div id="app" data-theme="tea" class="full-width full-height">
    <Drawer
      v-bind:open="menu"
      v-on:clickoverlay="toggleMenu()"
      v-on:escapedrawer="toggleMenu()"
      v-on:tabdrawer="handleTab"
    >
      <div ref="menuEl" v>
        <div class="titlebar">
          <button @click="toggleMenu" class="button">Menu</button>
        </div>
      </div>
    </Drawer>
    <PushDrawer v-bind:open="more">
      <template v-slot:left>
        <Scene v-bind:view="view" @click="clickActionButton">
          <div class="titlebar full-width">
            <button @click="toggleMenu" class="button">Menu</button>
            <div class="title-text">
              <h1 class="text-center">
                {{ location.name }}
              </h1>
            </div>
          </div>

          <template v-slot:commander>
            <Commander v-on:toggleview="toggleView()">
              <button
                ref="toggleMoreEl"
                class="button icon-button small"
                @click="toggleMore"
              >
                <i class="fas fa-ellipsis-v" aria-hidden></i> More
              </button>
            </Commander>
          </template>
          <template v-slot:response>
            <Response />
          </template>
        </Scene>
      </template>
      <template v-slot:right>
        <div class="menu full-height full-width">
          <div class="titlebar">
            <div class="title-text">hi</div>
            <button ref="closeMoreEl" @click="toggleMore" class="button icon">
              X
            </button>
          </div>
        </div>
      </template>
    </PushDrawer>
  </div>
</template>

<script>
import store from "../store.js";
import Drawer from "../components/Drawer";
import PushDrawer from "../components/PushDrawer";
import Scene from "../components/Scene";
import Commander from "../components/Commander";
import Response from "../components/Response";

export default {
  name: "GameUI",
  components: {
    PushDrawer,
    Scene,
    Commander,
    Response,
    Drawer,
  },
  props: [],
  computed: {
    focusables() {
      return this.getFocusables("menuEl");
    },
    location() {
      return store.getLocation();
    },
    response() {
      return store.response;
    },
  },
  data: () => ({
    more: false,
    view: true,
    menu: false,
    triggerEl: null,
  }),
  methods: {
    toggleMore(e) {
      this.more = !this.more;
      if (e && this.more === true) {
        this.$refs.closeMoreEl.focus();
      }
      if (!this.more) {
        this.$refs.toggleMoreEl.focus();
      }
    },
    toggleView() {
      this.view = !this.view;
    },
    toggleMenu(e = null) {
      this.menu = !this.menu;
      const hasChildren = this.focusables.length > 0;

      if (e && this.menu === true && hasChildren) {
        this.triggerEl = e.target;
        this.focusables[0].focus();
      }

      if (this.triggerEl && !this.menu) {
        this.triggerEl.focus();
        this.triggerEl = null;
      }
    },
    handleTab(e) {
      const target = e.target;
      const last = this.focusables[this.focusables.length - 1];
      const first = this.focusables[0];
      const isLast = target === last && !e.shiftKey;
      const isFirst = target === first && e.shiftKey;

      if (isFirst || isLast) e.preventDefault();
      if (isLast) first.focus();
      if (isFirst) last.focus();
    },
    getFocusables(ref) {
      const focusables = this.$refs[ref].querySelectorAll(
        "a, input, button, textarea, [tabindex='0'], [contenteditable='true']"
      );
      return [].slice.call(focusables);
    },
    clickActionButton(e) {
      const { target } = e;
      const noun = target.getAttribute("data-noun");
      const action = target.getAttribute("data-action");
      if (!noun || !action) return;
      store.command(`${action} ${noun}`);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content,
.menu {
  background: var(--tea-bg-3);
}

.titlebar {
  display: flex;
  padding: 0.5rem;
  align-items: center;
  border-bottom: 1px solid var(--tea-bg-2);
}

.titlebar .title-text {
  flex-basis: 100%;
}
</style>
