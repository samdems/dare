<template>
  <div>
    <mt-field label="name" placeholder="name" v-model="dare.name"></mt-field>
    <mt-field
      label="text"
      placeholder="text"
      v-model="dare.text"
      type="textarea"
      rows="4"
    ></mt-field>
    <mt-cell v-for="tag in this.tags" :key="tag.id" :title="tag.doc.name">
      <mt-switch v-model="dare.tags[tag.id]"></mt-switch>
    </mt-cell>
  </div>
</template>

<script>
import PouchDB from "pouchdb";
export default {
  props: ["value"],
  data() {
    return {
      dare: {
        tags: {},
      },
      dbTag: new PouchDB("tag"),
      tags: [],
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      const doc = await this.dbTag.allDocs({
        include_docs: true,
        attachments: true,
      });
      this.tags = doc.rows;
    },
  },
  watch: {
    value() {
      this.dare = this.value;
    },
    dare() {
      this.$emit("input", this.dare);
    },
  },
};
</script>

<style></style>
