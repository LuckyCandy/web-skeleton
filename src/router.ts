import { createRouter, createWebHistory } from 'vue-router'
import Home from '~/pages/Home.vue'
import Account from '~/pages/Account.vue'
import Effect from '~/pages/Effect.vue'
import Publish from '~/pages/publish/Index.vue'

const routers = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', name: '首页', component: Home },
      { path: '/account', name: '账号管理', component: Account },
      { path: '/effect', name: '效果查看', component: Effect },
      { path: '/publish', name: '内容发布', component: Publish },
    ]
  })
export default routers;