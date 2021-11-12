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
    getError() {
      if (dares.length == 0 && players.length == 0)
        return "You need to add dares and players to play";

      if (dares.length == 0) return "You need to add dares to play";
      if (players.length == 0) return "You need to add players to play";
    },
    getActivePlayer() {
      return players[this.activePlayerCount].doc;
    },
    getActiveDare() {
      return this.activeDare;
    },
    getActiveDareText() {
      if (!this.activeDare) return "You need to add dares to play";
      if (!this.activeDare.text)
        return this.getActivePlayer().name + " " + this.activeDare.name;
      return this.activeDare.text.split("$").join(this.getActivePlayer().name);
    },
    nextPlayer() {
      this.activePlayerCount++;
      if (this.activePlayerCount >= players.length) {
        this.activePlayerCount = 0;
      }
      return this.ActivePlayer;
    },

    checkPlayerHasAllTagsInArray(tags) {
      const that = this;
      return (
        tags.filter((tag) => {
          return that.getActivePlayer().tags[tag];
        }).length != 0
      );
    },
    findNextDare() {
      this.activeDare = _.sample(this.getPossibleDares())?.doc;
    },
    convertTagToArray(tags) {
      return Object.keys(_.omitBy(tags, (value) => value === false));
    },
    getPossibleDares() {
      return dares.filter((dare) => {
        const tags = this.convertTagToArray(dare.doc.tags);
        return this.checkPlayerHasAllTagsInArray(tags);
      });
    },
  };
};
