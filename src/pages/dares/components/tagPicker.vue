<template>
  <div>
    <mt-cell v-for="tag in this.Alltags" :key="tag.id" :title="tag.doc.name">
      <mt-switch v-model="tags[tag.id]"></mt-switch>
    </mt-cell>
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
    Alltags: Array,
  },
  data() {
    return {
      tags: {},
    };
  },
  mounted() {
    this.tags = this.value;
  },
  watch: {
    value() {
      this.tags = this.value;
    },
    tags() {
      this.$emit("input", this.tags);
    },
  },
};
</script>

<style></style>
