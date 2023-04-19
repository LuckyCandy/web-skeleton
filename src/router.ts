import { createRouter, createWebHistory } from 'vue-router'
import Home from '~/pages/Home.vue'
import Account from '~/pages/Account.vue'
import Effect from '~/pages/Effect.vue'
import Publish from '~/pages/Publish.vue'

const routers = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', name: 'home', component: Home },
      { path: '/account', name: 'account', component: Account },
      { path: '/effect', name: 'effect', component: Effect },
      { path: '/publish', name: 'publish', component: Publish },
    ]
  })
export default routers;