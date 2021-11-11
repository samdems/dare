<template>
  <div>
    <h1 style="text-align:center">{{ text || message }}</h1>
    <mt-button :disabled="hide" size="large" type="primary" @click="done()"
      >done</mt-button
    >
    <mt-button
      :disabled="hide"
      size="large"
      type="danger"
      style="margin-top:10px"
      @click="nextRound()"
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
      aciveDare: null,
      activePlayerCount: 0,
      activePlayer: null,
      dares: [],
      players: [],
      hide: true,
      message: "loading",
    };
  },
  async mounted() {
    await this.loadPlayers();
    await this.loadDares();
    await this.checkData();
  },
  methods: {
    checkData() {
      if (!this.activePlayer && !this.activePlayer) {
        this.hide = true;
        this.message = "You need to add dares and players to play";
        return;
      }
      if (!this.activePlayer) {
        this.hide = true;
        this.message = "You need to add players to play";
        return;
      }
      if (!this.aciveDare) {
        this.hide = true;
        this.message = "You need to add dares to play";
        return;
      }
      this.hide = false;
    },
    tagsToRemoveUpate() {
      if (!this.aciveDare.tagsToRemove) return;
      Object.keys(this.aciveDare.tagsToRemove).forEach((index) => {
        delete this.activePlayer.tags[index];
      });
    },
    done() {
      this.tagsToRemoveUpate();

      this.nextRound();
    },
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
      if (this.dares.length == 0) return;
      this.randomActiveDare();
    },
    async loadPlayers() {
      const doc = await this.dbPlayer.allDocs({
        include_docs: true,
        attachments: true,
      });
      this.players = doc.rows;
      if (this.players.length == 0) return;
      this.nextPlayer();
    },
    convertTagToArray(tags) {
      return Object.keys(_.omitBy(tags, (value) => value === false));
    },
    checkPlayerHasAllTagsInArray(tags) {
      return (
        tags.filter((tag) => {
          return this.activePlayerTags.includes(tag);
        }).length != 0
      );
    },
    randomActiveDare() {
      this.aciveDare = _.sample(this.possibleDares)?.doc;
    },
  },
  computed: {
    text() {
      if (!this.aciveDare) return "";
      if (!this.aciveDare.text)
        return this.activePlayer.name + " " + this.aciveDare.name;
      return this.aciveDare.text.split("$").join(this.activePlayer.name);
    },
    activePlayerTags() {
      return Object.keys(
        _.omitBy(this.activePlayer.tags, (value) => value === false)
      );
    },
    possibleDares() {
      return this.dares.filter((dare) => {
        const tags = this.convertTagToArray(dare.doc.tags);
        return this.checkPlayerHasAllTagsInArray(tags);
      });
    },
  },
};
</script>

<style></style>
