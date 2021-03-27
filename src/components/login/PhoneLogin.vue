<template>
  <div id="phoneLogin">
    <el-form :model="loginUser" status-icon>
      <el-form-item >
        <el-input v-model="loginUser.phone" autocomplete="off" clearable placeholder="请输入手机号">
          <template slot="prepend">中国+86</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginUser.checkCode" autocomplete="off" clearable placeholder="请输入4位验证码">
          <template slot="append"><el-link :disabled="disabled" :underline="false" @click.prevent="sendcode">{{btntxt}}</el-link></template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%;margin-top: 10px">登录/注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "PhoneLogin",
      data() {
        return {
          loginUser: {
            phone: '',
            checkCode: '',
          },
          disabled:false,
          time:60,
          btntxt:"发送验证码",
        };
      },
      // TODO 手机号正则验证
      methods: {
        submitForm(formName) {
          this.$http.post("http://localhost:9999/siji/user/phone?phone=" + this.loginUser.phone + "&checkCode=" + this.loginUser.checkCode).then(resp => {
            if (resp.data.code === 200) {
              window.localStorage.setItem("userToken", resp.data.data)
              this.$router.push("/index")
            }else {
              this.$message.error(resp.data.message);
            }
          })
        },
        // 获取验证码
        sendcode() {
          this.$http.get("http://localhost:9999/siji/user/phoneCode?phone=" + this.loginUser.phone).then(resp =>{
            console.log(resp.data)
          })
          this.time=60;
          this.timer();
        },
        //发送手机验证码倒计时
        timer() {
          if (this.time > 0) {
            this.disabled=true;
            this.time--;
            this.btntxt=this.time+"秒后，再次发送";
            setTimeout(this.timer, 1000);
          } else{
            this.time=0;
            this.btntxt="发送验证码";
            this.disabled=false;
          }
        }
      }
    }
</script>

<style scoped>
  #phoneLogin{
    font-family: 黑体;
  }
</style>
