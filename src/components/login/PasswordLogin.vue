<template>
  <div>
    <el-form :model="loginUser" :rules="rules" status-icon ref="passwordForm">
      <el-form-item prop="phone">
        <el-input placeholder="请输入手机号" v-model="loginUser.phone" clearable prefix-icon="icon iconfont icon-pingban2x"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" show-password v-model="loginUser.password" placeholder="请输入密码" clearable prefix-icon="icon iconfont icon-mimakejian2x"></el-input>
      </el-form-item>

      <el-form-item prop="captchaCode">
        <el-input placeholder="请输入验证码" v-model="loginUser.captchaCode" style="width: 60%" clearable prefix-icon="icon iconfont icon-pingji2x"></el-input>
        <img :src="captchaSrc" @click="changeCode" style="margin-left: 8%;cursor: pointer;width: 30%" title="点击切换验证码">
      </el-form-item>
      <el-button type="primary" style="width: 100%" @click="login('passwordForm')">登录</el-button>

    </el-form>
  </div>
</template>

<script>
    export default {
        name: "PasswordLogin",
      data() {
        var validatePhone = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入手机号码'));
          } else if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)) {
            callback(new Error('请输入正确的手机号码'));
          } else {
            callback();
          }
        };
        var validatePwd = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else if (!/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/.test(value)) {
            callback(new Error('密码至少包含数字，英文，长度6-20'));
          } else {
            callback();
          }
        };
        var validateCode = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入验证码'));
          } else if (!/\w{4}/.test(value)) {
            callback(new Error('验证码长度4位'));
          } else {
            callback();
          }
        }
        return {
          loginUser: {
            phone: '',
            captchaCode: '',
            password: '',
          },
          // 验证码src
          captchaSrc: 'http://localhost:9999/siji/captcha/getCode?time=' + new Date(),
          // 验证表单
          rules: {
            phone: [
              {validator: validatePhone, trigger: 'blur'}
            ],
            password: [
              {validator: validatePwd, trigger: 'blur'}
            ],
            captchaCode: [
              {validator: validateCode, trigger: 'blur'}
            ],
          }
        };
      },
      methods: {
        // 切换验证码
        changeCode() {
          this.captchaSrc = "http://localhost:9999/siji/captcha/getCode?time=" + new Date()
        },
        // 登录
        login(formName) {
          const that = this
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // 验证通过提交表单
              this.$http.post("http://localhost:9999/siji/user/login",this.loginUser).then(res => {
                console.log(res.data)
                if (res.data.code === 200) {
                  // 登录成功
                  window.localStorage.setItem("userToken", res.data.data)
                  // 跳转
                  this.$router.push("/index")
                }else {
                  // 登录失败
                  this.$message({
                    showClose: true,
                    message: res.data.message,
                    type: 'error'
                  });
                }
              }).catch(err => {
                console.log(err)
              })
            }else {
              this.$message.error('请按规则填入所有字段');
            }
          })

        },
      }
    }
</script>

<style scoped>

</style>
