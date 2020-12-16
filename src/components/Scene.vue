<template>
  <div v-bind:data-view="view" class="scene">
    <slot></slot>
    <div class="description">
      <div
        class="bg"
        ref="bg"
        role="presentation"
        aria-hidden
        :style="{
          backgroundImage: `url(${bgs[game.activeLocationKey]})`,
        }"
      ></div>
      <div class="corpus box">
        {{ game.location.description }}
      </div>
      <div class="items box">
        <ul class="unstyled">
          <li v-for="thing in game.location.things" v-bind:key="thing.key">
            <Description v-bind:thing="thing" />
            <!-- {{ thing.callAction("describe") }} -->
          </li>
        </ul>
      </div>
    </div>
    <div class="commander">
      <div class="box">
        <slot name="commander"></slot>
      </div>
    </div>
    <div class="response">
      <div class="box">
        <slot name="response"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store.js";
import Description from "./Description";

export default {
  name: "Scene",
  components: {
    Description,
  },
  props: {
    view: { type: Boolean, default: true },
  },
  computed: {
    // location() {
    //   return store.getLocation();
    // },
    // description() {
    //   const loc = store.getLocation();
    //   return loc.callAction("describe");
    // },
    // things() {
    //   const loc = store.getLocation();
    //   return loc.getThings();
    // },
    bg() {
      return `url(${store.bgs[this.game.activeLocationKey]})`;
    },
  },
  data: () => ({
    bgs: store.bgs,
    game: store.game,
  }),
  // mounted: function () {
  //   console.log(store.bgs, store.game.activeLocationKey);
  //   this.$refs.bg.style.backgroundImage = `url(${
  //     store.bgs[store.game.activeLocationKey]
  //   })`;
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scene {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  background-color: var(--tea-bg-3);
  --view-transition: all 0.5s linear;
}

.scene > * {
  width: 100%;
}

.box {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.description {
  overflow-y: auto;
  justify-content: center;
  flex-flow: column;
  display: flex;
  align-items: center;
  position: relative;
  background: var(--tea-bg-3);
  overflow: hidden;
  height: 100%;
}

.description .bg {
  position: absolute;
  height: 100%;
  width: 100%;
  max-width: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  transition: var(--view-transition);
  box-shadow: inset 0 0 10px #000000;
}

.description .corpus {
  margin-bottom: 0.5rem;
}

.description .corpus,
.description .items:not(:empty) {
  background-color: rgb(17 21 24 / 85%);
  box-shadow: var(--tea-shadow);
  border: 1px solid var(--tea-bg-3);
  max-height: 50%;
  display: flex;
  flex-flow: column;
  /* justify-content: center; */
  overflow-y: auto;
  z-index: 2;
  position: relative;
  border-radius: var(--tea-radius);
  padding: 0.5rem 1rem;
  transition: var(--view-transition);
  opacity: 1;
}

.description .items:not(:empty) li {
  margin: 0.5rem 0;
  padding: 0.5rem 0;
}

.scene[data-view="false"] .description .corpus,
.scene[data-view="false"] .description .items {
  opacity: 0;
}

.commander {
  padding: 0.5rem;
}

.response {
  height: 150px;
  overflow-y: auto;
  border: 1px solid var(--tea-bg-3);
  background: var(--tea-bg-1);
}

@media (min-width: 801px) {
  .description[data-v-55d9de8c] {
    flex-basis: 100%;
    padding: var(--tea-spacing);
  }
}
</style>
