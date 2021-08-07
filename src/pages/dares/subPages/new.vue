<template>
  <div>
    <update title="New" :dare="dare" @save="save" @cancel="goBack">
      <dareEditor v-model="dare"></dareEditor>
    </update>
  </div>
</template>

<script>
import dareEditor from "../components/editor";
import update from "../../../components/update";
import PouchDB from "pouchdb";
import uniqid from "uniqid";
export default {
  name: "dareNew",
  data() {
    return {
      dare: {},
      db: new PouchDB("dare"),
    };
  },
  methods: {
    async save() {
      console.log("save");
      this.dare._id = uniqid();
      await this.db.put(this.dare);
      this.goBack();
    },
    goBack() {
      this.dare = {};
      this.$router.push("/dares");
    },
  },
  components: { dareEditor, update },
};
</script>

<style></style>
