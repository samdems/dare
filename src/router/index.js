import Vue from 'vue'
import VueRouter from 'vue-router'
import game from '../pages/game'
import dares from '../pages/dares/index'
import players from '../pages/players/index'
import tags from '../pages/tags/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/game',
    name: 'game',
    component: game
  },
  ...dares,
  ...players,
  ...tags
  

]

const router = new VueRouter({
  routes
})

export default router
