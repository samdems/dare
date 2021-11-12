<template>
  <div>
    <div v-if="error">
      {{ error }}
    </div>
    <div v-else>
      <h1 style="text-align:center">{{ activeDareText }}</h1>

      <mt-button size="large" type="primary" @click="done()">done</mt-button>
      <mt-button
        size="large"
        type="danger"
        style="margin-top:10px"
        @click="fail()"
        >fail</mt-button
      >
    </div>
  </div>
</template>

<script>
import DaresServices from "../services/dares.js";

export default {
  name: "game",
  data() {
    return {
      daresServices: null,
    };
  },
  async mounted() {
    this.daresServices = await DaresServices();
    this.daresServices?.findNextDare();
  },
  methods: {
    done() {
      this.daresServices?.findNextDare();
      this.daresServices?.nextPlayer();
    },
    fail() {
      this.daresServices?.findNextDare();
      this.daresServices?.nextPlayer();
    },
  },
  computed: {
    error() {
      return this.daresServices?.getError();
    },
    player() {
      return this.daresServices?.getActivePlayer();
    },
    activeDare() {
      return this.daresServices?.getActiveDare();
    },
    activeDareText() {
      return this.daresServices?.getActiveDareText();
    },
  },
};
</script>

<style></style>
