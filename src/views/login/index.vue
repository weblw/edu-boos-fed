<template>
  <div class="login">
    <el-form class="login-form" label-position="top" ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" class="login-btn" type="primary" @click="onSubmit">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/services/user'

export default Vue.extend({
  name: 'loginIndex',
  data () {
    return {
      loading: false,
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入手密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在6-18个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        // 表单验证
        await (this.$refs.form as Form).validate()
        this.loading = true
        // 提交表单
        const { data } = await login(this.form)
        // 处理请求结果
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          // 登陆成功，记录状态，状态需要能够全局访问
          this.$store.commit('setUser', data.content)
          this.$message.success('登陆成功！')
          this.$router.push(this.$route.query.redirect as string || '/')
        }
      } catch (err) {
        console.log('登陆失败', err)
      }
      this.loading = false
    }
  }
})
</script>

<style lang='scss' scoped>
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-form {
    width: 300px;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    .login-btn {
      width: 100%;
    }
  }
}
</style>
