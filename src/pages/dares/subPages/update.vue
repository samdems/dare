<template>
  <div>
    <update title="Update Dare" @save="save" @cancel="goBack">
      <dareEditor v-model="dare"></dareEditor>
    </update>
  </div>
</template>

<script>
import dareEditor from "../components/editor";
import update from "../../../components/update";
import PouchDB from "pouchdb";
export default {
  name: "dareNew",
  data() {
    return {
      dare: {
        tags: {},
      },
      db: new PouchDB("dare"),
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.dare = await this.db.get(this.$route.params.id);
    },
    async save() {
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
