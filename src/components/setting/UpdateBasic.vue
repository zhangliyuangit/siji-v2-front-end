<template>
    <div id="updateBasic">
      <el-row style="margin-top: 10px">
        <el-col :span="5">用户名</el-col>
        <el-col :span="19">
          <el-input style="width: 80%;border: 0px"
                    v-model="user.name"
                    maxlength="10"
                    show-word-limit
          ></el-input>
          <el-button class="update-btn" @click="updateName">修改</el-button>
        </el-col>
      </el-row>

      <el-row style="margin-top: 10px">
        <el-col :span="5">年  龄</el-col>
        <el-col :span="19">
          <el-input-number style="width: 80%;border: 0px" v-model="user.age"></el-input-number>
          <el-button class="update-btn" @click="updateAge">修改</el-button>
        </el-col>
      </el-row>

      <el-row style="margin-top: 10px">
        <el-col :span="5">简  介</el-col>
        <el-col :span="19">
          <el-input style="width: 80%;border: 0px"
                    v-model="user.brief"
                    maxlength="30"
                    show-word-limit></el-input>
          <el-button class="update-btn" @click="updateBrief">修改</el-button>
        </el-col>
      </el-row>

      <el-row style="margin-top: 10px">
        <el-col :span="5">职  务</el-col>
        <el-col :span="19">
          <el-input style="width: 80%;border: 0px"
                    v-model="user.position"
                    maxlength="10"
                    show-word-limit></el-input>
          <el-button class="update-btn" @click="updatePosition">修改</el-button>
        </el-col>
      </el-row>

      <el-row style="margin-top: 10px">
        <el-col :span="5">公  司</el-col>
        <el-col :span="19">
          <el-input style="width: 80%;border: 0px"
                    v-model="user.company"
                    maxlength="10"
                    show-word-limit></el-input>
          <el-button class="update-btn" @click="updateCompany">修改</el-button>
        </el-col>
      </el-row>

      <el-row style="margin-top: 10px">
        <el-col :span="5">个人主页</el-col>
        <el-col :span="19">
          <el-input style="width: 80%;border: 0px"
                    v-model="user.home_page"
                    maxlength="50"
                    show-word-limit></el-input>
          <el-button class="update-btn" @click="updateHomePage">修改</el-button>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    import jwtDecode from "jwt-decode";

    export default {
        name: "UpdateBasic",
      data(){
          return{
            user: {
              name: '',
              age: 0,
              brief: '',
              position: '',
              company: '',
              home_page: ''
            },
          }
      },
      created() {
        this.user.name = jwtDecode(window.localStorage.getItem("userToken")).name
        this.user.brief = jwtDecode(window.localStorage.getItem("userToken")).brief
        this.user.age = jwtDecode(window.localStorage.getItem("userToken")).age
        this.user.position = jwtDecode(window.localStorage.getItem("userToken")).position
        this.user.company = jwtDecode(window.localStorage.getItem("userToken")).company
        this.user.home_page = jwtDecode(window.localStorage.getItem("userToken")).home_page

      },
      methods: {
          // 更新用户名
        updateName() {
          const userInfo = {
            id: jwtDecode(window.localStorage.getItem("userToken")).id,
            name: this.user.name
          }
          this.updateUserInfo(userInfo)
        },
        updateAge() {
          const userInfo = {
            id: jwtDecode(window.localStorage.getItem("userToken")).id,
            age: this.user.age
          }
          this.updateUserInfo(userInfo)
        },
        updateBrief() {
          const userInfo = {
            id: jwtDecode(window.localStorage.getItem("userToken")).id,
            brief: this.user.brief
          }
          this.updateUserInfo(userInfo)
        },
        updatePosition() {
          const userInfo = {
            id: jwtDecode(window.localStorage.getItem("userToken")).id,
            position: this.user.position
          }
          this.updateUserInfo(userInfo)
        },
        updateCompany() {
          const userInfo = {
            id: jwtDecode(window.localStorage.getItem("userToken")).id,
            company: this.user.company
          }
          this.updateUserInfo(userInfo)
        },
        updateHomePage() {
          const userInfo = {
            id: jwtDecode(window.localStorage.getItem("userToken")).id,
            home_page: this.user.home_page
          }
          this.updateUserInfo(userInfo)
        },
        updateUserInfo(user){
          this.$http.post("http://localhost:9999/siji/user/updateUserInfo", user, {
            headers: {
              token: window.localStorage.getItem("userToken")
            }
          }).then(resp => {
            // 更新token
            if (resp.data.code === 200) {
              this.$message({
                message: '信息修改成功',
                type: 'success'
              });
              window.localStorage.setItem("userToken", resp.data.data)
            }
          })
        }
      }
    }
</script>

<style scoped>
  #updateBasic{
    font-family: pingfang-x;
  }
  .update-btn{
    background-color: #5c99f5;
    color: white;
    font-family: pingfang-x;
    font-weight: 600;
  }
</style>
