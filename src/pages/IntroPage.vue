<template>
  <div class="intro-page text-center full-height" v-on:click="handleClick">
    <article>
      <header>
        <h1>Lazerus Project</h1>
      </header>
      <img :src="logo" alt="amadreason" />
    </article>
    <div class="clue">click or tap to continue</div>
  </div>
</template>

<script>
export default {
  name: "IntroPage",
  data: () => ({
    logo: require("@/assets/amr-logo-mini.svg"),
  }),
  methods: {
    handleClick() {
      this.$router.push("/game");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  max-width: 100px;
}

.intro {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-flow: column;
  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;
}

.clue {
  -webkit-animation: fadeinout 2.5s infinite; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadeinout 2.5s infinite; /* Firefox < 16 */
  -ms-animation: fadeinout 2.5s infinite; /* Internet Explorer */
  -o-animation: fadeinout 2.5s infinite; /* Opera < 12.1 */
  animation: fadeinout 2.5s infinite;
}

@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeinout {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
</style>
