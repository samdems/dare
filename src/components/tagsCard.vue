<template>
  <div>
    <mt-cell>
      <div slot="title">
        {{ title }}
      </div>
      <mt-button type="primary" @click="showTags = !showTags">
        <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
      </mt-button>
    </mt-cell>
    <mt-badge
      style="margin:5px"
      v-for="(tag, index) in tags"
      :key="index"
      size="small"
    >
      {{ findTag(index) }}
    </mt-badge>
    <popover :title="title" v-model="showTags">
      <tagPicker :Alltags="Alltags" v-model="tags" />
    </popover>
  </div>
</template>

<script>
import tagPicker from "./tagPicker";
import popover from "./popover.vue";
export default {
  props: ["value", "Alltags", "title"],
  data() {
    return {
      tags: [],
      showTags: false,
    };
  },
  components: { tagPicker, popover },
  mounted() {
    this.tags = this.value;
  },
  methods: {
    findTag(id) {
      const tag = this.Alltags.find((el) => el.id == id);
      if (!tag) return "_-_";
      return tag.doc.name;
    },
  },
  watch: {
    value() {
      this.tags = this.value;
    },
    tags() {
      this.$emit("input", this.tags);
    },
  },
};
</script>

<style></style>
