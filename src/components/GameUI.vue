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
            <Response :response="response" />
          </template>
        </Scene>
      </template>
      <template v-slot:right>
        <div class="menu full-height full-width">
          <div class="titlebar">
            <div class="title-text more">
              <button
                class="button"
                :aria-pressed="inventoryOn"
                @click="setMoreOn('inventory')"
              >
                Inventory
              </button>
              <button
                class="button"
                :aria-pressed="locationsOn"
                @click="setMoreOn('locations')"
              >
                Locations
              </button>
            </div>
            <button ref="closeMoreEl" @click="toggleMore" class="button icon">
              X
            </button>
          </div>

          <div v-if="locationsOn">
            <ul>
              <li v-for="l in locations" :key="l.key">{{ l.name }}</li>
            </ul>
          </div>

          <div v-if="inventoryOn">
            <ul>
              <li v-for="item in inventory" :key="item.key">{{ item.name }}</li>
            </ul>
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
    view: () => store.state.view,
    more: () => store.state.more,
    menu: () => store.state.menu,
    triggerEl: () => store.state.triggerEl,
    focusables() {
      return this.getFocusables("menuEl");
    },
    location() {
      return store.getLocation();
    },
    locations() {
      return store.getLocations();
    },
    inventory() {
      return store.getInventory();
    },
    response() {
      return store.state.response;
    },
    inventoryOn() {
      return this.moreOn === "inventory";
    },
    locationsOn() {
      return this.moreOn === "locations";
    },
  },
  watch: {
    menu(newVal) {
      if (newVal) {
        store.state.triggerEl = document.activeElement;
        this.focusables[0].focus();
      }
      if (!newVal) {
        store.state.triggerEl.focus();
        store.state.triggerEl = null;
      }
    },
    more(newVal) {
      if (newVal) {
        store.state.triggerEl = document.activeElement;
        this.$refs.closeMoreEl.focus();
      }
      if (!newVal) {
        store.state.triggerEl.focus();
        store.state.triggerEl = null;
      }
    },
  },
  data: () => ({
    moreOn: "inventory",
  }),
  methods: {
    toggleMore() {
      store.state.more = !store.state.more;
    },
    setMoreOn(flagName) {
      this.moreOn = flagName;
    },
    toggleView() {
      store.state.view = !store.state.view;
    },
    toggleMenu() {
      store.state.menu = !store.state.menu;
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
      const name = target.getAttribute("data-name");
      const action = target.getAttribute("data-action");
      if (!name || !action) return;
      store.command(`${action} ${name}`);
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

.titlebar .title-text.more {
  display: flex;
}

button[aria-pressed="true"] {
  text-decoration: underline;
}
</style>
