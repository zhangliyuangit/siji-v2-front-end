<template>
    <div>
      <el-row>
        <el-col :span="20" :offset="2">
          <el-input prefix-icon="icon iconfont icon-shouji2x" v-model="phone" disabled></el-input>
          <el-input prefix-icon="icon iconfont icon-shouhu2x" style="margin-top: 10px" v-model="code">
            <template slot="append">
              <el-link :disabled="disabled" :underline="false" @click.prevent="sendcode">{{btntxt}}</el-link>
            </template>
          </el-input>
          <el-input style="margin-top: 10px"
                    prefix-icon="icon iconfont icon-suoding2x"
                    placeholder="请输入密码"
                    v-model="password"
                    type="password"
                    :show-password="true"></el-input>
          <el-input style="margin-top: 10px"
                    prefix-icon="icon iconfont icon-suoding2x"
                    placeholder="请再次输入密码"
                    v-model="affirmPassword"
                    type="password"
                    :show-password="true"></el-input>
          <el-button style="margin-top: 10px;background-color: #0066FF;color: white;font-weight: 500;font-family: pingfang-x;width: 100%"
          :disabled="code == '' || password == '' || affirmPassword == ''" @click="updatePassword">确认修改</el-button>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    import jwtDecode from "jwt-decode";

    export default {
        name: "UpdatePassword",
      data() {
          return{
            phone: '',
            disabled: false,
            time:60,
            btntxt:"发送验证码",
            password: '',
            affirmPassword: '',
            code: ''
          }
      },
      created() {
        this.phone = jwtDecode(window.localStorage.getItem("userToken")).phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      },
      methods: {
        sendcode() {
          this.$http.get("http://localhost:9999/siji/user/phoneCode?phone=" + jwtDecode(window.localStorage.getItem("userToken")).phone).then(resp =>{
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
        },
        // 更新密码
        updatePassword() {
          if (this.code.length !== 4){
            this.$message({
              message: '验证码不正确',
              type: 'error'
            });
            return
          }
          if (this.password !== this.affirmPassword) {
            this.$message({
              message: '两次输入的密码不一致',
              type: 'error'
            });
            return;
          }
          if (!/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/.test(this.password)) {
            this.$message({
              message: '密码格式不正确',
              type: 'error'
            });
            return;
          }
          const user = {
            password: this.password,
            phone: jwtDecode(window.localStorage.getItem("userToken")).name,
            captchaCode: this.code
          }
          this.$http.post("http://localhost:9999/siji/user/updateUserPassword/" + jwtDecode(window.localStorage.getItem("userToken")).id, user, {
            headers: {
              token: window.localStorage.getItem("userToken")
            }
          }).then(resp => {
            if (resp.data.code === 200) {
              this.$message({
                message: '密码修改成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: resp.data.message,
                type: 'error'
              });
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
