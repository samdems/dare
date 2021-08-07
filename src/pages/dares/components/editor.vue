<template>
  <div>
    <mt-field label="name" placeholder="name" v-model="dare.name"></mt-field>
    <mt-field
      label="text"
      placeholder="text"
      v-model="dare.text"
      type="textarea"
      rows="4"
    ></mt-field>
    <mt-cell>
      <div slot="title">
        Tags
      </div>
      <mt-button type="primary" @click="showTags = !showTags">
        update Tags
      </mt-button>
    </mt-cell>
    <mt-badge
      style="margin:5px"
      v-for="(tag, index) in dare.tags"
      :key="index"
      size="small"
    >
      {{ findTag(index) }}
    </mt-badge>
    <popover title="Tags" v-model="showTags">
      <tagPicker :Alltags="tags" v-model="dare.tags" />
    </popover>
  </div>
</template>

<script>
import PouchDB from "pouchdb";
import tagPicker from "../../../components/tagPicker";
import popover from "../../../components/popover.vue";
export default {
  props: ["value"],
  components: { popover, tagPicker },
  data() {
    return {
      dare: {
        tags: {},
        tagsToRemove: {},
      },
      showTags: false,
      dbTag: new PouchDB("tag"),
      tags: [],
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      const doc = await this.dbTag.allDocs({
        include_docs: true,
        attachments: true,
      });
      this.tags = doc.rows;
    },
    findTag(id) {
      const tag = this.tags.find((el) => el.id == id);
      if (!tag) return "_-_";
      return tag.doc.name;
    },
  },
  watch: {
    value() {
      this.dare = this.value;
    },
    dare() {
      this.$emit("input", this.dare);
    },
  },
};
</script>

<style></style>
