<template>
  <div>
    <update title="Update" :player="player" @save="save" @cancel="goBack">
      <playerEditor v-model="player"></playerEditor>
    </update>
  </div>
</template>

<script>
import playerEditor from "../components/editor";
import update from "../../../components/update";
import PouchDB from "pouchdb";
export default {
  name: "playerNew",
  data() {
    return {
      player: {},
      db: new PouchDB("player"),
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.player = await this.db.get(this.$route.params.id);
    },
    async save() {
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
