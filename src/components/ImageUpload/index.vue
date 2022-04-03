<template>
  <el-upload
    :action="uploadImgUrl"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :file-list="fileList"
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

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
</script>
