<template>
    <div class="pb-space-1" />
    <el-divider content-position="left">平台列表</el-divider>
    <div class="p-container">
        <el-card 
            :body-style="{ padding: '0px' }" 
            :style="{ width: '270px' }"
            v-for="each in platformData"
            v-loading="each.loading"
            >
            <div class="p-main">
                <div class="p-main-ct">
                    <span style="font-weight: bold; font-size: 18px;">{{ each.name }}</span>
                    <el-divider content-position="center">
                        <span style="color: gray; font-style: italic; font-size: 12px;">过期时间</span>
                    </el-divider>
                    <span style="color: gray;">{{ each.expireTime }}</span>
                </div>
                <el-button 
                    :style="{ padding: 0, height: '120px', width: '60px', fontSize: '18px'}">
                    <el-icon :size="30">
                        <Refresh />
                    </el-icon>
                </el-button>
            </div>
        </el-card>
    </div>
</template>
  
<script lang="ts" setup>
import { Refresh } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'

interface PlatformCard {
    name: string 
    expireTime: string 
    loading: boolean
}

const platformData = ref<PlatformCard[]>([])

onMounted(() => {
    // 此处加载接口
    platformData.value = platformData.value.concat({
        name: '抖音', expireTime: '2023-12-09 12:09:02', loading: true
    })
    platformData.value = platformData.value.concat({
        name: '快手', expireTime: '2023-12-09 12:09:02', loading: false
    })
    platformData.value = platformData.value.concat({
        name: '快手', expireTime: '2023-12-09 12:09:02', loading: false
    })
    platformData.value = platformData.value.concat({
        name: '快手', expireTime: '2023-12-09 12:09:02', loading: false
    })
    platformData.value = platformData.value.concat({
        name: '快手', expireTime: '2023-12-09 12:09:02', loading: false
    })
    platformData.value = platformData.value.concat({
        name: '快手', expireTime: '2023-12-09 12:09:02', loading: false
    })
})
</script>

<style scoped>
.pb-space-1 {
    height: 1px;
}

.pb-space-2 {
    height: 10px;
}

.p-container {
    padding: 10px 36px;
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    flex-wrap: wrap;
}

.p-main {
    display: flex;
    justify-content: space-between;
}

.p-main-ct {
    padding: 14px;
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    justify-content: space-between;
}


</style>