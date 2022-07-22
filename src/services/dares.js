import PouchDB from "pouchdb";
import _ from "lodash";

const dbSettings = {
  include_docs: true,
  attachments: true,
};

export default async () => {
  const dbDare = new PouchDB("dare");
  const dbPlayer = new PouchDB("player");

  const docDare = await dbDare.allDocs(dbSettings);
  const dares = docDare.rows;

  const docPlayer = await dbPlayer.allDocs(dbSettings);
  const players = docPlayer.rows;

  return {
    activeDare: null,
    activePlayerCount: 0,
    dares,
    players,
    getLoadedError() {
      if (!this.dares.length && !players.length)
        return "You need to add dares and players to play";

      if (!this.dares.length) return "You need to add dares to play";
      if (!this.players.length) return "You need to add players to play";
    },
    getActivePlayer() {
      return this.players[this.activePlayerCount].doc;
    },
    getActiveDare() {
      return this.activeDare;
    },
    getActiveDareText() {
      if (!this.activeDare.text) {
        return this.getActivePlayer().name + " " + this.activeDare.name;
      }
      return this.activeDare.text.split("$").join(this.getActivePlayer().name);
    },
    nextPlayer() {
      this.activePlayerCount++;
      if (this.activePlayerCount >= this.players.length) {
        this.activePlayerCount = 0;
      }
      return this.ActivePlayer;
    },

    checkPlayerHasAllTagsInArray(tags) {
      if (!tags.length) return true;
      return tags.filter((tag) => this.getActivePlayer().tags[tag]).length;
    },
    findNextDare() {
      this.activeDare = _.sample(this.getPossibleDares())?.doc;
      if (!this.activeDare) {
        throw Error("no activeDare found");
      }
      return this.activeDare;
    },
    convertTagToArray(tags) {
      return Object.keys(_.omitBy(tags, (value) => value === false));
    },
    getPossibleDares() {
      if (!this.dares.length) {
        throw Error("no Dares found");
      }
      const possibleDares = this.dares.filter((dare) => {
        const tags = this.convertTagToArray(dare.doc.tags);
        return this.checkPlayerHasAllTagsInArray(tags);
      });

      if (!possibleDares.length) {
        throw Error("no possible Dares");
      }
      return possibleDares;
    },
  };
};
