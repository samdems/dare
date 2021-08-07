<template>
  <div>
    <tag v-for="tag in tags.rows" :key="tag.id" :tag="tag" />
    <mt-button
      size="large"
      type="primary"
      style="margin-top:10px"
      @click="gotoNew()"
    >
      <font-awesome-icon icon="plus" />
    </mt-button>
  </div>
</template>

<script>
import PouchDB from "pouchdb";
import tag from "../components/card";
export default {
  components: { tag },
  data() {
    return {
      db: new PouchDB("tag"),
      tags: [],
    };
  },
  async mounted() {
    this.load();
    this.db
      .changes({
        since: "now",
        live: true,
        include_docs: true,
      })
      .on("change", this.load);
  },
  methods: {
    async load() {
      this.tags = await this.db.allDocs({
        include_docs: true,
        attachments: true,
      });
    },
    gotoNew() {
      this.$router.push("/tags/new");
    },
  },
};
</script>

<style></style>
