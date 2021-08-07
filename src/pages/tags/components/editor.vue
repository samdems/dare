<template>
  <div>
    <mt-field label="name" placeholder="name" v-model="tag.name"></mt-field>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      tag: {},
    };
  },
  watch: {
    value() {
      this.tag = this.value;
    },
    tag() {
      this.$emit("input", this.tag);
    },
  },
};
</script>

<style></style>
