<template>
  <div>
    <mt-field label="name" placeholder="name" v-model="player.name"></mt-field>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      player: {},
    };
  },
  watch: {
    value() {
      this.player = this.value;
    },
    player() {
      this.$emit("input", this.player);
    },
  },
};
</script>

<style></style>
