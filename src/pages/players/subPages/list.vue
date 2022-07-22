<template>
  <div>
    <player v-for="player in players.rows" :key="player.id" :player="player" />
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
import player from "../components/card";
export default {
  components: { player },
  data() {
    return {
      db: new PouchDB("player"),
      players: [],
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
      this.players = await this.db.allDocs({
        include_docs: true,
        attachments: true,
      });
    },
    gotoNew() {
      this.$router.push("/players/new");
    },
  },
};
</script>

<style></style>
