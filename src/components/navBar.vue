<template>
  <mt-tabbar fixed v-model="activePage">
    <mt-tab-item id="game">
      <font-awesome-icon icon="gamepad" size="lg"></font-awesome-icon><br />
    </mt-tab-item>
    <mt-tab-item id="dares">
      <font-awesome-icon icon="sticky-note" size="lg"></font-awesome-icon><br />
    </mt-tab-item>
    <mt-tab-item id="players">
      <font-awesome-icon icon="users" size="lg"></font-awesome-icon><br />
    </mt-tab-item>
    <mt-tab-item id="tags">
      <font-awesome-icon icon="tags" size="lg"></font-awesome-icon><br />
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
export default {
  data() {
    return {
      activePage: "game",
    };
  },
  watch: {
    activePage() {
      if (!this.activePage) return;
      this.$router.push("/" + this.activePage);
    },
  },
};
</script>

<style></style>
