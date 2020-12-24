<template>
  <div class="creditsui text-center full-height">
    <article>
      <h1 class="text-divider title">Credits</h1>

      <button class="button" @click="(e) => store.switchActiveUI(e, 'GameUI')">
        Return to game
      </button>

      <div class="credits">
        <div v-for="(v, idx) in credits" :key="idx" class="credit">
          <pre class="text-left">{{v.assetName}} by {{v.creator}}
Link: <a v-if="v.link" :href="v.link">{{v.link}}</a>
License: <a v-if="v.license" :href="v.license">{{v.license}}</a></pre>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "CreditsUI",
  data: () => ({
    store,
    credits: [
      {
        assetName: "jordan-grimmer-office2.jpg",
        creator: `Jordan Gimmer`,
        link: "https://www.jordangrimmer.co.uk/m2qp107ahghlxvl28ff9t8ztmlrbnj",
        license: "",
      },
      {
        assetName: "resirealistic4flat2.jpg",
        creator: `Jordan Gimmer`,
        link: "https://www.artstation.com/artwork/W2AYGE",
        license: "",
      },
    ],
  }),
};
</script>

<style scoped>
.creditsui {
  background: var(--tea-bg-2);
  min-height: 100vh;
}
.title {
  padding: var(--tea-spacing);
}
.credits {
  margin-top: var(--tea-spacing);
  overflow: initial;
  /* display: flex;
  flex-flow: row wrap;
  justify-content: center; */
}

.credit {
  background: var(--tea-bg-3);
  margin: calc(var(--tea-spacing) / 2);
  padding: calc(var(--tea-spacing) / 2);
  max-width: 100%;
}
</style>
