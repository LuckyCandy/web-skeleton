<template>
    <div class="pb-space-1" />
    <!-- 发布表单 -->
    <el-divider content-position="left">发布配置</el-divider>
    <el-card class="box-card" style="margin-left: 40px;">
        <el-form label-position="left" label-width="90px" :model="formData" :rules="formRules" ref="ruleFormRef"
            style="min-width: 460px" v-loading="inProgress">
            <el-form-item label="标题:" prop="title">
                <el-input v-model="formData.title" />
            </el-form-item>

            <el-form-item label="视频:" prop="video">
                <el-upload class="upload-demo" drag :http-request="fileUpload" ref="uploadRef" :limit="1"
                    :on-success="uploadSuccess" :on-error="uploadFail" :on-exceed="uploadLimit"
                    :on-remove="removeUploadFile">
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        拖拽文件到这儿 或者 <em>点击上传</em>
                    </div>
                </el-upload>
            </el-form-item>

            <el-form-item label="发布渠道:" prop="channels">
                <div class="channel-wrap">
                    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                        @change="chooseAllChannel">全部</el-checkbox>
                    <el-checkbox-group v-model="formData.channels" @change="addChannel">
                        <el-checkbox v-for="channel in channelInfo" :key="channel.code" :label="channel.code">
                            {{ channel.name }}
                        </el-checkbox>
                    </el-checkbox-group>
                </div>

            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit(ruleFormRef)">发 布</el-button>
                <el-button @click="resetForm(uploadRef)">重 置</el-button>
            </el-form-item>

        </el-form>
    </el-card>

    <div v-if="formData.channels.length > 0">
        <div class="pb-space-2" />
        <el-divider content-position="left">发布结果</el-divider>
        <div class="progress-show" v-for="(ch, index) in formData.processData" :key="index">
            <p>发布到 - <span style="color:darkorange">{{ ch.name }}</span></p>
            <c-progress :ref="(el) => setProgressRef(el, ch.code)"></c-progress>
            <span class="err-show">{{ ch.tips }}</span>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage, FormInstance, FormRules, UploadInstance, UploadFile, CheckboxValueType, UploadRequestOptions } from 'element-plus'
import CProgress from './progress/Progress.vue';
import contentApi from '~/api/publish'
import resourceApi from '~/api/resource';

interface ProcessData {
    name: String,
    icon: String,
    tips: String,
    code: String
}

const channelInfo = [
    { 'name': '抖音', 'icon': 'Mic', 'code': 'douyin' },
    { 'name': '快手视频', 'icon': 'Mic', 'code': 'kuaishou' },
    { 'name': '西瓜视频', 'icon': 'Mic', 'code': 'xigua' },
    { 'name': '小红书', 'icon': 'Cellphone', 'code': 'xiaohongshu' },
]
const allChannels = channelInfo.map(e => {
    return e.code
})

const ruleFormRef = ref<FormInstance>()
const uploadRef = ref<UploadInstance>()
const formRules = reactive<FormRules>({
    'title': [{ required: true, message: '标题必填', trigger: 'blur' }],
    'video': [{ required: true, message: '请上传视频文件', trigger: 'blur' }],
    'channels': [{ required: true, type: 'array', message: '至少选择一种发布渠道', trigger: 'change' },]
})

// 是否处理中
const inProgress = ref(false)

// 表单数据
const formData = reactive({
    title: '',
    video: '',
    channels: [] as any[],
    processData: [] as any[]
})

// 渠道选择控制
const checkAll = ref(false)
const isIndeterminate = ref(true)

// 进度控件
const progressRef: {[key: string]: typeof CProgress} = {}
const setProgressRef = (el: any, type: string) => {
    if (el) {
        progressRef[type] = el;
    }
}

// 文件上传
const fileUpload = (options: UploadRequestOptions) => {
    const { file, onProgress, onSuccess, onError } = options;
    return resourceApi.upload(file)
        .then((res) => onSuccess(res.data))
        .catch(err => onError(err))
}

// 选择全部渠道
const chooseAllChannel = (val: CheckboxValueType) => {
    if (val) {
        formData.channels = allChannels
        let channelArr: ProcessData[] = []
        for (const key in channelInfo) {
            const channelItem = channelInfo[key]
            channelArr = channelArr.concat({
                name: channelItem.name,
                icon: channelItem.icon,
                tips: '',
                code: channelItem.code
            })
        }
        formData.processData = channelArr
    } else {
        formData.channels = []
        formData.processData = []
    }
    isIndeterminate.value = false
}
const addChannel = (value: CheckboxValueType[]) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === allChannels.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < allChannels.length

    let channelArr: ProcessData[] = []
    for (const key in channelInfo) {
        const channelItem = channelInfo[key]
        if (value.includes(channelItem.code)) {
            channelArr = channelArr.concat({
                name: channelItem.name,
                icon: channelItem.icon,
                tips: '',
                code: channelItem.code
            })
        }
    }
    formData.processData = channelArr
}

// 提交发布
const onSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (!valid) return
        inProgress.value = true
        // 先创建内容，后发布
        contentApi.create(formData.title, formData.video).then(res => {
            console.log(res.data)
            syncPublish(res.data.content_id)
        })
    })
}

// 重置表单
const resetForm = (uploadEl: UploadInstance | undefined) => {
    if (!uploadEl) return;
    formData.title = ''
    formData.video = ''
    uploadEl.clearFiles()
}

// 文件上传成功
const uploadSuccess = (response: any, file: UploadFile) => {
    console.log("uploadSuccess", response, file.uid)
    formData.video = response.file_key
}

// 处理w上传失败
const uploadFail = (err: any) => {
    console.log('上传失败', err)
}

// 处理上传超过限制
const uploadLimit = () => {
    ElMessage.error('视频文件仅允许上传一个，如需替换请删除后再试')
}

// 删除上传文件
const removeUploadFile = () => {
    formData.video = ""
}

// 同步发布内容
const syncPublish = (contentId: number) => {
    if (contentId == 0 || !contentId) {
        console.log('创建失败:', contentId)
        inProgress.value = false
        return
    }

    Promise.all(formData.processData.map(e => {
        return new Promise<void>((resolve, reject) => {
            progressRef[e.code].start()
            console.log('content_id', contentId)
            contentApi.pulish(1, contentId).then(res => {
                progressRef[e.code].finish()
            }).catch(err => {
                e.tips = err.message
                progressRef[e.code].error()
            }).finally(() => resolve())
        })
    })).then(() => {
        inProgress.value = false
        console.log("all done!!", progressRef)
    })
}
</script>

<style scoped>
.upload-demo {
    min-width: 460px;
}

.channel-wrap {
    display: block;
}

.pb-space-1 {
    height: 1px;
}

.pb-space-2 {
    height: 10px;
}

.err-show {
    display: block;
    margin-top: 10px;
    color: red
}

.progress-show {
    padding-left: 40px;
    font-size: 14px;
}
</style>
  