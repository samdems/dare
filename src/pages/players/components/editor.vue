<template>
  <div>
    <mt-field label="name" placeholder="name" v-model="player.name"></mt-field>
    <tagsCard title="Tags" :Alltags="tags" v-model="player.tags" />
  </div>
</template>

<script>
import PouchDB from "pouchdb";
import tagsCard from "../../../components/tagsCard.vue";
export default {
  props: ["value"],
  components: { tagsCard },
  data() {
    return {
      player: {
        tags: {},
      },
      dbTag: new PouchDB("tag"),
      tags: [],
      test: true,
      showTags: false,
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
