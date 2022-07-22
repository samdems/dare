<template>
  <div id="app">
    <mt-header fixed :title="currentRouteName" style=""> </mt-header>
    <br /><br />
    <router-view />
    <navBar />
  </div>
</template>

<script>
import navBar from "./components/navBar.vue";

export default {
  name: "App",
  components: { navBar },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>
