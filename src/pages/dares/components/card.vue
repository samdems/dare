<template>
  <mt-cell :title="dare.doc.name">
    <mt-button type="primary" plain @click="update()" style="margin-right:10px">
      <font-awesome-icon icon="pencil-alt" />
    </mt-button>
    <mt-button type="danger" plain @click="remove()">
      <font-awesome-icon icon="trash" />
    </mt-button>
  </mt-cell>
</template>

<script>
import PouchDB from "pouchdb";
export default {
  props: {
    dare: Object,
  },
  data() {
    return {
      db: new PouchDB("dare"),
    };
  },
  methods: {
    update() {
      this.$router.push(`/dares/${this.dare.id}`);
    },
    async remove() {
      const doc = await this.db.get(this.dare.id);
      await this.db.remove(doc._id, doc._rev);
    },
  },
};
</script>

<style></style>
