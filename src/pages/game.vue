<template>
  <div>
    <h1 style="text-align:center">{{ text }}</h1>
    <mt-button size="large" type="primary" @click="nextRound()">done</mt-button>
    <mt-button size="large" type="danger" style="margin-top:10px"
      >fail</mt-button
    >
  </div>
</template>

<script>
import PouchDB from "pouchdb";
import _ from "lodash";

export default {
  name: "game",
  data() {
    return {
      dbDare: new PouchDB("dare"),
      dbPlayer: new PouchDB("player"),
      aciveDare: {},
      activePlayerCount: 0,
      activePlayer: {},
      dares: [],
      players: [],
    };
  },
  mounted() {
    this.loadPlayers();
    this.loadDares();
  },
  methods: {
    nextRound() {
      this.nextPlayer();
      this.randomActiveDare();
    },
    nextPlayer() {
      this.activePlayer = this.players[this.activePlayerCount].doc;
      this.activePlayerCount++;
      if (this.activePlayerCount >= this.players.length) {
        this.activePlayerCount = 0;
      }
    },
    async loadDares() {
      const doc = await this.dbDare.allDocs({
        include_docs: true,
        attachments: true,
      });
      this.dares = doc.rows;
      if (this.dares.length == 0) return this.$router.push("/dares");
      this.randomActiveDare();
    },
    async loadPlayers() {
      const doc = await this.dbPlayer.allDocs({
        include_docs: true,
        attachments: true,
      });
      this.players = doc.rows;
      if (this.players.length == 0) return this.$router.push("/players");
      this.nextPlayer();
    },
    randomActiveDare() {
      this.aciveDare = _.sample(this.dares).doc;
    },
  },
  computed: {
    text() {
      if (!this.aciveDare) return "error no active Dare found";
      if (!this.aciveDare.text) return this.aciveDare.name;
      return this.aciveDare.text.split(".p.").join(this.activePlayer.name);
    },
  },
};
</script>

<style></style>
