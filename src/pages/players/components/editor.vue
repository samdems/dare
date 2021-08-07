<template>
  <div>
    <mt-field label="name" placeholder="name" v-model="player.name"></mt-field>
    <mt-cell v-for="tag in this.tags" :key="tag.id" :title="tag.doc.name">
      <mt-switch v-model="player.tags[tag.id]"></mt-switch>
    </mt-cell>
  </div>
</template>

<script>
import PouchDB from "pouchdb";
export default {
  props: ["value"],
  data() {
    return {
      player: {
        tags: {},
      },
      dbTag: new PouchDB("tag"),
      tags: [],
      test: true,
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
      this.player = this.value;
    },
    player() {
      this.$emit("input", this.player);
    },
  },
};
</script>

<style></style>
