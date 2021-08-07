<template>
  <div>
    <Dare v-for="dare in dares.rows" :key="dare.id" :dare="dare" />
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
import Dare from "../components/card";
export default {
  components: { Dare },
  data() {
    return {
      db: new PouchDB("dare"),
      dares: [],
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
      this.dares = await this.db.allDocs({
        include_docs: true,
        attachments: true,
      });
    },
    gotoNew() {
      this.$router.push("/dares/new");
    },
  },
};
</script>

<style></style>
