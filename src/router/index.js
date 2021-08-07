import Vue from 'vue'
import VueRouter from 'vue-router'
import game from '../pages/game'
import dares from '../pages/dares/index'
import players from '../pages/players/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/game',
    name: 'game',
    component: game
  },
  ...dares,
  ...players

]

const router = new VueRouter({
  routes
})

export default router
