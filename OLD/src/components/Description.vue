<template>
  <div v-html="rawHtml"></div>
</template>

<script>
import store from "../store";
export default {
  name: "Description",
  props: ["thing"],
  computed: {
    rawHtml() {
      let description = this.thing.callAction("describe");
      const button = store.actionButton({
        name: this.thing.name,
        noun: this.thing.noun,
        key: this.thing.key,
      });
      description = description.replace(this.thing.name, button);
      return description;
    },
  },
  data: () => ({}),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.response {
  padding: 0.5rem;
  height: 100%;
  overflow-y: auto;
}
</style>
