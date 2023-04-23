import { createRouter, createWebHistory } from 'vue-router'
import Home from '~/pages/Home.vue'
import Effect from '~/pages/Effect.vue'
import Publish from '~/pages/publish/Index.vue'
import Platform from '~/pages/platform/Index.vue'
import Skeleton from '~/pages/Skeleton.vue'
import Login from '~/pages/Login.vue'
import { useUserStore } from "~/store/user"


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '', component: Skeleton, meta: { requireAuth: true }, children: [
        { path: '/', name: '首页', component: Home },
        { path: '/platform', name: '平台管理', component: Platform },
        { path: '/effect', name: '效果查看', component: Effect },
        { path: '/publish', name: '内容发布', component: Publish },
      ]
    },
    { path: '/login', name: '登录', component: Login }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (!userStore.token) {
      next({
        path: "/login"
      });
    } else if (
      userStore.expire == null ||
      Date.now() > parseInt(userStore.expire)
    ) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
})
export default router;