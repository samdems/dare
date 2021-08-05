<template>
  <div id="app">
    <game v-if="activePage == 'game'"></game>
    <dares v-if="activePage == 'dares'"></dares>
    <mt-tabbar fixed v-model="activePage">
      <mt-tab-item id="game">
        <font-awesome-icon icon="gamepad" size="lg"></font-awesome-icon><br>
      </mt-tab-item>
      <mt-tab-item id="dares">
        <font-awesome-icon icon="sticky-note" size="lg"></font-awesome-icon><br>
      </mt-tab-item>
    </mt-tabbar>

  </div>
</template>

<script>
import game from './pages/game.vue'
import dares from './pages/dares.vue'

export default {
  components: { game,dares },
  name: 'App',
  data() {
    return {
      activePage:'game'
    }
  },
}
</script>

<style>

</style>
