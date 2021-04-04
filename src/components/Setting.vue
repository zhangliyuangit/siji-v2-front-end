<template>
    <div id="setting">


      <el-row>
        <el-col :span="16" :offset="4">
          <el-tabs @tab-click="handleClick" v-model="activeName">
            <el-tab-pane label="基本信息" name="/updateBasic"></el-tab-pane>
            <el-tab-pane label="修改头像" name="/updateAvatar"></el-tab-pane>
            <el-tab-pane label="修改密码" name="/updatePassword"></el-tab-pane>
          </el-tabs>
          <el-card>
            <router-view/>

          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    import jwtDecode from "jwt-decode";

    export default {
        name: "Setting",
      data(){
          return {
            activeName: this.$route.path
          }
      },
      methods: {
        handleClick(tab, event) {
          this.$router.push(tab.name)
        }
        }
    }
</script>

<style scoped>
  #setting{
    font-family: pingfang-x;
  }
  .avatar-uploader  {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 178px;
    width: 178px;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
