<template>
  <div>
    <update title="New tag" @save="save" @cancel="goBack">
      <tagEditor v-model="tag"></tagEditor>
    </update>
  </div>
</template>

<script>
import tagEditor from "../components/editor";
import update from "../../../components/update";
import PouchDB from "pouchdb";
import uniqid from "uniqid";
export default {
  name: "tagNew",
  data() {
    return {
      tag: {},
      db: new PouchDB("tag"),
    };
  },
  methods: {
    async save() {
      console.log("save");
      this.tag._id = uniqid();
      await this.db.put(this.tag);
      this.goBack();
    },
    goBack() {
      this.tag = {};
      this.$router.push("/tags");
    },
  },
  components: { tagEditor, update },
};
</script>

<style></style>
