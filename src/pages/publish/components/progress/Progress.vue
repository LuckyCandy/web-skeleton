<template>
  <el-progress :percentage="progressRef" :status="statusRef">.</el-progress>
</template>
  
<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const DURATION = 60000 // 进度完成时间，单位：毫秒
const MIN_INTERVAL = 200 // 最小更新进度的时间间隔，单位：毫秒
const MAX_INTERVAL = 10000 // 最大更新进度的时间间隔，单位：毫秒

const progressRef = ref<number>(0) // 进度状态
const timerRef = ref<number | null>(null) // 定时器
const statusRef = ref<any>("")

// 根据时间计算进度
const calculateProgress = (elapsedTime: number) => {
  if (elapsedTime < 15000) {
    return Math.floor((elapsedTime / 15000) * 30)
  } else if (elapsedTime < 45000) {
    return 30 + Math.floor(((elapsedTime - 15000) / 30000) * 20)
  } else if (elapsedTime < 85000) {
    return 50 + Math.floor(((elapsedTime - 45000) / 40000) * 20)
  } else if (elapsedTime < 145000) {
    return 70 + Math.floor(((elapsedTime - 85000) / 60000) * 22)
  } else if (elapsedTime < 165000) {
    return 92 + Math.floor(((elapsedTime - 145000) / 20000) * 6)
  } else {
    return 99
  }
}

// 更新进度
const updateProgress = () => {
  const elapsedTime = Date.now() - startTimeRef.value!
  const progress = calculateProgress(elapsedTime)
  if (progress > progressRef.value) {
    progressRef.value = progress
  } else if (progress < progressRef.value) {
    // 如果进度值小于当前值，则增加一个单位
    progressRef.value = Math.min(progressRef.value + 1, 99)
  }
  if (progressRef.value < 99) {
    const remainingTime = DURATION - elapsedTime
    const interval = Math.max(MIN_INTERVAL, Math.min(MAX_INTERVAL, remainingTime / 50))
    timerRef.value = window.setTimeout(updateProgress, interval)
  } else {
    timerRef.value = null
  }
}

// 开始方法
const startTimeRef = ref<number | null>(null)
const start = () => {
  if (!startTimeRef.value && !timerRef.value) {
    startTimeRef.value = Date.now()
    updateProgress()
  }
}

// 错误结束
const error = () => {
  if (timerRef.value) {
    window.clearTimeout(timerRef.value)
    timerRef.value = null
    statusRef.value = "exception"
  }
}

// 重置
const reset = () => {
  if (timerRef.value) {
    window.clearTimeout(timerRef.value)
  }
  startTimeRef.value = Date.now()
  progressRef.value = 0
  statusRef.value = ""
  updateProgress()
}

// 完成方法
const finish = () => {
  if (timerRef.value) {
    window.clearTimeout(timerRef.value)
    timerRef.value = null
  }
  statusRef.value = "success"
  progressRef.value = 100
}

defineExpose({
  start, error, finish, reset
})
</script>