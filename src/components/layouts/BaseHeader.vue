<script lang="ts" setup>
import { toggleDark } from "~/composables";
import { useRouter } from "vue-router"; 

const router = useRouter();
const goHome = () => { router.push("/"); } 
</script>

<template>
  <div style="display: flex; border-bottom: solid 1px var(--ep-menu-border-color); align-items: center; justify-content: space-between;">
    <el-image @click="goHome()" style="width: 40px; height: 40px; margin: 0 14px;" src="/src/assets/logo.png" />
      <button @click="toggleDark()"
        class="border-none bg-transparent cursor-pointer"
        style="height: var(--ep-menu-item-height); margin: 0 14px;"
      >
        <i inline-flex :size="30" i="dark:ep-moon ep-sunny" />
      </button>
  </div>
</template>
