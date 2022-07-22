<template>
  <div>
    <update title="New tag" @save="save" @cancel="goBack">
      <span v-if="error" class="error">
        <mt-badge class="error-badge" size="large" type="error">
          {{ error }}
        </mt-badge>
      </span>
      <tagEditor v-model="tag"></tagEditor>
    </update>
  </div>
</template>

<script>
import tagEditor from "../components/editor";
import update from "../../../components/update";
import PouchDB from "pouchdb";
import uniqid from "uniqid";
import isvalid from "../mixins/isvalid";
export default {
  name: "tagNew",
  mixins: [isvalid],
  data() {
    return {
      error: null,
      tag: {},
      db: new PouchDB("tag"),
    };
  },
  methods: {
    async save() {
      if (!this.isvalid()) {
        return;
      }
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

<style>
.error {
  display: flex;
  align-items: center;
  justify-content: center;
}
.error-badge {
  padding: 10px !important;
}
</style>
