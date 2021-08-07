<template>
  <div v-if="show">
    <div class="popover">
      <mt-header :title="title" style=""> </mt-header>
      <slot></slot>
      <mt-tabbar>
        <mt-tab-item id="save">
          <mt-button type="primary" @click="done()">
            done
          </mt-button>
        </mt-tab-item>
      </mt-tabbar>
    </div>
    <div class="popoverGray" @click="done()"></div>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
    title: String,
  },
  data() {
    return {
      show: this.value,
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
      this.$emit("input", this.show);
    },

    done() {
      this.toggle();
      this.$emit("done");
    },
  },
  watch: {
    value() {
      this.show = this.value;
    },
    dare() {
      this.$emit("input", this.show);
    },
  },
};
</script>

<style>
.popover {
  z-index: 999;
  top: 50px;
  bottom: 50px;
  right: 10px;
  left: 10px;
  background-color: white;
  position: absolute;
}
.popoverGray {
  z-index: 998;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: black;
  opacity: 0.5;
  position: absolute;
}
</style>
