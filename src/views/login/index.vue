<template>
  <div class="login">
    <div class="context">
      <h2>系统登录</h2>
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
        <el-form-item label="text" prop="account">
          <template #label>
            <el-icon>
              <user-filled />
            </el-icon>
          </template>
          <el-input v-model="ruleForm.account" type="text" placeholder="账号" autocomplete="off" />
        </el-form-item>
        <el-form-item label="password" prop="password">
          <template #label>
            <el-icon>
              <lock />
            </el-icon>
          </template>
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="密码"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { UserFilled, Lock } from '@element-plus/icons-vue';

import { login } from '@/api/login';

import { setToken } from '@/utils/auth';
import { useRouter } from 'vue-router';

const ruleFormRef = ref<FormInstance>()
const Router = useRouter();

const validateAccount = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('Please input the account'))
  }
  else {
    callback()
  }
}

const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('Please input the password'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  account: '',
  password: '',
})

const rules = reactive({
  account: [{ validator: validateAccount, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
})

// 登录
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      login(ruleForm).then((result: any): void => {
        console.log(result);
        if (result.data.code === 200) {
          setToken('token', result.data.token)
          ElMessage({
            showClose: true,
            message: '登录成功.',
            type: 'success',
          })
          Router.push({
            path: '/me'
          })
        }
      }).catch((err: any): void => {
        ElMessage({
          showClose: true,
          message: '账号不存在，或者账号密码错误.',
          type: 'error',
        })
      });
    } else {
      console.log('error submit!')
      return false
    }
  })
}

</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-color: #2d3a4b;
}
.context {
  width: 450px;
  margin: 0 auto;
  padding: 15% 0 0 0;
  > h2 {
    font-size: 36px;
    font-weight: 700;
    color: #fff;
    text-align: center;
    margin: 0 0 40px 0;
  }
  .demo-ruleForm {
    .el-form-item {
      border: 1px solid hsla(0, 0%, 100%, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
      height: 47px;
      line-height: 47px;
      &:last-child {
        height: 36px;
      }
      .el-icon {
        height: 47px;
        padding: 0 0 0 20px;
        font-size: 18px;
      }
    }
    .el-input {
      /deep/input {
        background: transparent;
        box-shadow: none;
        color: #fff;
        caret-color: #fff;
        padding: 0;
      }
    }

    .el-button {
      height: 36px;
      width: 100%;
    }
  }
}
</style>