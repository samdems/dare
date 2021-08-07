<template>
  <div>
    <update title="New" :player="player" @save="save" @cancel="goBack">
      <playerEditor v-model="player"></playerEditor>
    </update>
  </div>
</template>

<script>
import playerEditor from "../components/editor";
import update from "../../../components/update";
import PouchDB from "pouchdb";
import uniqid from "uniqid";
export default {
  name: "playerNew",
  data() {
    return {
      player: {},
      db: new PouchDB("player"),
    };
  },
  methods: {
    async save() {
      console.log("save");
      this.player._id = uniqid();
      await this.db.put(this.player);
      this.goBack();
    },
    goBack() {
      this.player = {};
      this.$router.push("/players");
    },
  },
  components: { playerEditor, update },
};
</script>

<style></style>
