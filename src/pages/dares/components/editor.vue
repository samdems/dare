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
    <tagsCard title="Needed Tags" :Alltags="tags" v-model="dare.tags" />
    <tagsCard
      title="Tags to remove"
      :Alltags="tags"
      v-model="dare.tagsToRemove"
    />
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
      dare: {
        tags: {},
        tagsToRemove: {},
      },
      showTags: false,
      tagsToRemove: false,
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
