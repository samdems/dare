<template>
  <div>
    <update title="Update tag" @save="save" @cancel="goBack">
      <tagEditor v-model="tag"></tagEditor>
    </update>
  </div>
</template>

<script>
import tagEditor from "../components/editor";
import update from "../../../components/update";
import PouchDB from "pouchdb";
export default {
  name: "tagNew",
  data() {
    return {
      tag: {},
      db: new PouchDB("tag"),
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.tag = await this.db.get(this.$route.params.id);
    },
    async save() {
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
