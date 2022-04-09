<template>
  <el-upload
    name="file"
    :action="uploadImgUrl"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-error="handleError"
    :file-list="fileList"
    :headers="headers"
  >
    <el-icon>
      <Plus />
    </el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="图片预览" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { getToken } from '@/utils/auth';

import type { UploadProps, UploadUserFile } from 'element-plus'
import listToString from '../../hooks/listToString';

const emit = defineEmits(['update:modelValue'])
const uploadImgUrl = ref(process.env.VUE_APP_BASE_API + '/file/upload') // 上传的图片服务器地址
const headers = reactive({
  Authorization: "Bearer " + getToken('token'),
})

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  }
])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// 移除图片时回调
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
  handleFileList()
  emit('update:modelValue', listToString(fileList.value))
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
  emit('update:modelValue', listToString(fileList.value))
}
// 上传失败时回调
const handleError: UploadProps['onError'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile);
}

// 处理fileList数据
function handleFileList(){
  for (const key of Object.keys(fileList.value)) {
    const value = fileList.value[key]
    console.log(value.response);
    if (value.response) {
      value.url = value?.response.data.url
    }
  }
}
</script>
