<template>
  <el-upload name="file" :action="uploadImgUrl" list-type="picture-card" :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove" :on-success="handleSuccess" :on-error="handleError" :before-upload="beforeAvatarUpload"
    :file-list="fileList" :headers="headers" :limit="limit" :class="{ hide: fileList.length >= limit }">
    <el-icon>
      <Plus />
    </el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="图片预览" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, onUpdated, reactive, ref, watch, watchEffect } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { getToken } from '@/utils/auth';

import { ElMessage } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
import listToString from '../../hooks/listToString';

interface Props {
  modelValue?: any;
  limit?: number;
  fileSize?: number;
}
const { modelValue, limit = 15, fileSize = 5 } = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])
const uploadImgUrl = ref(process.env.VUE_APP_BASE_API + '/file/upload') // 上传的图片服务器地址
const headers = reactive({
  Authorization: "Bearer " + getToken('token'),
})

const fileList = ref<UploadUserFile[]>([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// 监听modelValue
watch(modelValue, function handler() {
  if (modelValue) {
    const list = Array.isArray(modelValue) ? modelValue : modelValue.split(',')
    fileList.value = list.map((item:any) => {
      if (typeof item === 'string') {
        item = {
          name: item,
          url: item
        }
      }
      return item
    })
  } else {
    fileList.value = []
    return []
  }
}, {
  deep: true,
  immediate: true
})

// 移除图片时回调
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
  handleFileList()
  emit('update:modelValue', listToString(fileList.value, 'url'))
}
// 选择列表图片时回调
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
// 上传成功时回调
const handleSuccess: UploadProps['onSuccess'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile);
  handleFileList()
  console.log(fileList);

  emit('update:modelValue', listToString(fileList.value, 'url'))
}
// 上传失败时回调
const handleError: UploadProps['onError'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile);
}
// 上传文件之前判断文件大小
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // if (rawFile.type !== 'image/jpeg') {
  //   ElMessage.error('Avatar picture must be JPG format!')
  //   return false
  // } else if (rawFile.size / 1024 / 1024 > 5) {
  //   ElMessage.error('Avatar picture size can not exceed 5MB!')
  //   return false
  // }
  if (rawFile.size / 1024 / 1024 > fileSize) {
    ElMessage.error('图片大小不能超过 5MB!')
    return false
  }
  return true
}

// 处理fileList数据
function handleFileList() {
  for (const key of Object.keys(fileList.value)) {
    const value = fileList.value[key]
    console.log(value.response);
    if (value.response) {
      value.url = value?.response.data.url
    }
  }
}
</script>

<style lang="less" scoped>
.hide /deep/.el-upload--picture-card {
  display: none;
}
</style>