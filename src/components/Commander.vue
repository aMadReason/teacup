<template>
  <div class="commander-input">
    <form @submit.prevent="cmd">
      <label for="cmd">Command:</label>
      <div class="commander-inputgroup">
        <input class="input" v-model="inputCommand" id="cmd" type="text" />
        <button class="button" type="submit">Submit</button>
      </div>
    </form>
    <div class="commander-controls">
      <button
        @click="$emit('toggleview', e)"
        role="presentation"
        class="button icon-button desc"
      >
        View
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "Commander",
  emits: ["command", "toggleview"],
  props: {},
  computed: {},
  data: () => ({
    inputCommand: "",
  }),
  methods: {
    cmd() {
      store.command(this.inputCommand);
      this.inputCommand = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.commander-input {
  flex-basis: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
}

.commander-input .commander-inputgroup {
  display: flex;
  justify-content: space-between;
}

.commander-input .commander-controls,
.commander-input .commander-inputgroup {
  display: flex;
  justify-content: space-evenly;
}

.commander-input .commander-inputgroup button,
.commander-input .commander-inputgroup input,
.commander-input .commander-controls button {
  margin-top: 0.5rem;
}

.commander-input .commander-controls > * {
  flex-basis: 49%;
}

.commander-input .commander-inputgroup > * {
  flex-basis: 50%;
}

.commander-input .commander-inputgroup input[type="text"] {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.commander-input .commander-inputgroup button[type="submit"] {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.commander-input {
  flex-flow: row nowrap;
  align-items: flex-end;
  justify-content: space-between;
}

@media (min-width: 480px) {
  .commander-input {
    flex-flow: row nowrap;
    align-items: flex-end;
    justify-content: space-between;
  }

  .commander-input > * {
    flex-basis: 48%;
  }
}
</style>
