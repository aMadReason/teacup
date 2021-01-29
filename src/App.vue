<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import annyang from "annyang";
import store from "./store";

const app = {
  name: "App",
  components: {},
  computed: {},
  data: () => ({
    game: store.game,
    state: store.state,
    inventory: store.game.inventory,
    locations: store.game.locations,
    location: store.game.location,
  }),
  watch: {
    location() {
      store.playAtmosphere(this.location.key);
    },
  },
  methods: {
    command(str) {
      const attempt = this.game.command(str);
      const { lAttempt, pAttempt } = attempt;
      if (!str && !lAttempt && !pAttempt) return null;
      const lThings = lAttempt.actOnThings; // location attempt
      const pThings = pAttempt.actOnThings; // player attempt
      let done = false;

      if (lAttempt.type === "single" && !done) {
        store.singleCommand(lAttempt);
        done = true;
      }

      // no thing in location or on player
      if (lThings.length > 0 && pThings.length > 0 && !done) {
        const things = [...lThings, ...pThings];
        this.state.response = store.replaceThings({
          res: () =>
            `There is more than one '${lThings[0].noun}' available in the ${
              location.name
            } and inventory, please specify; ${things
              .map((i) => i.name)
              .join(", ")}.`,
          actOnThings: things,
        });
        done = true;
      }

      // thing in location
      if (lThings.length === 1 && pThings.length === 0 && !done) {
        store.state.response = store.replaceActions(lAttempt);
        store.playSimpleSoundEffects(lAttempt);
        done = true;
      }

      // thing on person
      if (pThings.length === 1 && lThings.length === 0 && !done) {
        store.state.response = store.replaceActions(pAttempt);
        store.playSimpleSoundEffects(pAttempt);
        done = true;
      }

      // anything else
      if (!done) {
        store.state.response = store.replaceThings(lAttempt);
        store.playSimpleSoundEffects(lAttempt);
      }

      // update data or reactivity breaks 🤢
      ["inventory", "locations", "location"].map((i) => {
        if (this[i]) this[i] = this.game[i];
      });

      this.$forceUpdate(); // just in case
    },
    getLocation(key) {
      return this.game.getLocation(key || this.location.key);
    },
  },
  mounted() {
    store.playAtmosphere(this.location.key);

    document.addEventListener("tea-event", (e) => {
      const loc = this.location;
      const {
        prefab,
        //term,
        //options
      } = e.detail;

      switch (prefab.noun) {
        case "computer":
          this.$router.push("computer");
          break;
        case "switch":
          console.log(this.state.lights[loc.key]);
          this.state.lights[loc.key] = prefab.stateKey === "on" ? true : false;
          console.log(this.state.lights[loc.key]);
          break;
      }
    });

    const commands = {
      "try *cmd": (cmd) => {
        this.$root.command(cmd);
        this.$forceUpdate(); // just in case
      },
      back: () => {
        if (["game"].includes(this.$router.name) === true) {
          return (store.state.response = "Can't go back");
        }
        this.$router.go(-1);
      },
    };

    annyang.addCommands(commands); // Add our commands to annyang

    this.$nextTick(function () {
      annyang.start(); // Start listening.
    });
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
