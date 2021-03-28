<template>
  <!-- 用户详情页面 -->
    <div id="userDetails">

      <!-- 对应的用户信息 -->
      <el-row>
        <el-col :span="16" :offset="4">
          <el-card shadow="never">
            <el-row>
              <el-col :span="4">
                <el-avatar v-if="userInfo.header_pic != null" :src="userInfo.header_pic" :size="100" class="header-pic"></el-avatar>
                <el-avatar v-if="userInfo.header_pic == null" class="header-pic" :size="100">{{userInfo.name}}</el-avatar>
              </el-col>

              <el-col :span="16">
                <!-- 用户名 -->
                <div style="font-weight: 800;font-size: 30px">{{userInfo.name}}</div>

                <div style="margin-top: 20px"><i class="icon iconfont icon-bianji2x"></i>{{userInfo.brief}}</div>
              </el-col>

              <el-col :span="4">
                <el-button round style="margin-top: 30px"
                v-text="userInfo.isAttention ? '取消关注' : '关注'"
                :class="userInfo.isAttention ? 'attention' : 'noAttention'"
                @click="toAttention"></el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>


      <!-- TODO 标题栏这个要做子路由 -->
      <el-row>
        <el-col :span="16" :offset="4">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="文章" name="/userArticles"></el-tab-pane>
            <el-tab-pane label="问题" name="/userQuestions"></el-tab-pane>
            <el-tab-pane label="收藏" name="/userCollects"></el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <router-view/>
    </div>
</template>

<script>
    import jwtDecode from "jwt-decode";

    export default {
        name: "UserDetails",
      data() {
          return {
            activeName: 'first',
            userInfo: {
              header_pic: null
            }
          }
      },
      methods: {
        handleClick(tab) {
          this.$router.push(tab.name)
        },
        toAttention(){
          var currentUserId = jwtDecode(window.localStorage.getItem("userToken")).id
          if (this.userInfo.isAttention) {
            // 现在是关注状态，点击取消关注
            this.$http.delete("http://localhost:9999/siji/user/cancelAttention/" + currentUserId + "/" + this.userInfo.id, {
              headers: {
                token: window.localStorage.getItem("userToken")
              }
            })
          }else {
            this.$http.post("http://localhost:9999/siji/user/toAttention/" + currentUserId + "/" + this.userInfo.id, null, {
              headers: {
                token: window.localStorage.getItem("userToken")
              }
            })
          }
          // 切换按钮状态
          this.userInfo.isAttention = !this.userInfo.isAttention
        }
      },
      created() {
          this.$http.get("http://localhost:9999/siji/user/" + this.$route.params.id + "/" + jwtDecode(window.localStorage.getItem("userToken")).id, {
            headers: {
              token: window.localStorage.getItem("userToken")
            }
          }).then(resp => {
            this.userInfo = resp.data.data;
            console.log(resp.data.data)
          })
      }
    }
</script>

<style scoped>
  #userDetails{
    font-family: pingfang-x;
  }
  .attention{
    background-color: #757373;
    color: white;
    font-family: PingFang;
  }
  .noAttention{
    background-color: #0066FF;
    color: white;
    font-family: PingFang;
  }
</style>
