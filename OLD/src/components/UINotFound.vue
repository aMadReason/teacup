<template>
  <div class="notfoundui text-center full-height">
    <article>
      <h1 class="text-divider title">404 Not Found</h1>
    </article>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "UINotFound",
  props: ["thing"],
  data: () => ({
    store,
    state: store.state,
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
