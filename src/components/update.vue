<template>
  <div>
    <mt-header fixed :title="title" style="">
      <mt-button slot="left" @click="goBack()">
        <font-awesome-icon icon="chevron-left" />
      </mt-button>
    </mt-header>
    <br /><br />
    <slot></slot>
    <mt-button type="primary" size="large" @click="save()">Save</mt-button>
    <mt-button
      type="danger"
      size="large"
      @click="cancel()"
      style="margin-top:10px"
      >cancel</mt-button
    >
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
    title: String,
  },
  methods: {
    async save() {
      this.$emit("save");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style></style>
