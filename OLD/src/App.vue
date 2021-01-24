<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import data from "./data";
import store from "./store";

const app = {
  name: "App",
  components: {},
  data: () => ({
    game: data,
    state: store.state,
  }),
  methods: {
    getLocation(key) {
      return this.game.getLocation(key || this.game.activeLocationKey);
    },
    getCharacter(key = this.game.playerCharacterKey) {
      return this.game.getCharacter(key);
    },
    getLocations() {
      return this.game.locations;
    },
    getInventory() {
      const player = this.game.getCharacterInventory();
      return player ? player.things : [];
    },
    command(str) {
      const location = this.getLocation();
      const attempt = this.game.command(str);
      const { lAttempt, pAttempt } = attempt;

      if (!str && !lAttempt && !pAttempt) return null;

      const lThings = lAttempt.actOnThings; // location attempt
      const pThings = pAttempt.actOnThings; // player attempt

      store.handleSoundEffects({
        locationAttempt: lAttempt,
        playerAttempt: pAttempt,
      });

      if (lAttempt.type === "single") {
        return store.singleCommand(lAttempt);
      }

      if (lThings.length > 0 && pThings.length > 0) {
        const things = [...lThings, ...pThings];
        return (this.state.response = store.replaceThings({
          res: () =>
            `There is more than one '${lThings[0].noun}' available in the ${
              location.name
            } and inventory, please specify; ${things
              .map((i) => i.name)
              .join(", ")}.`,
          actOnThings: things,
        }));
      }

      if (lThings.length === 1 && pThings.length === 0) {
        return (store.state.response = store.replaceActions(lAttempt));
      }

      if (pThings.length === 1 && lThings.length === 0) {
        return (store.state.response = store.replaceActions(pAttempt));
      }

      return (store.state.response = store.replaceThings(lAttempt));
    },
  },
};

export default app;
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
