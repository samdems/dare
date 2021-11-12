<template>
  <div>
    <div v-if="error || loadedError">
      <h1 style="text-align:center">{{ loadedError }} {{ error }}</h1>
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
      error: null,
      showSkip: false,
    };
  },
  async mounted() {
    this.daresServices = await DaresServices();
    this.nextRound();
  },
  methods: {
    done() {
      this.nextRound();
    },
    fail() {
      this.nextRound();
    },
    nextRound() {
      this.daresServices?.nextPlayer();
      try {
        this.daresServices?.findNextDare();
      } catch (error) {
        if (error.message == "no possible Dares") {
          this.showSKip = true;
          this.error = `There are no possible dares for ${this.player.name}. check the tags for ${this.player.name} and the deres.`;
          return;
        }
        this.error = error.message;
      }
    },
  },
  computed: {
    loadedError() {
      return this.daresServices?.getLoadedError();
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
