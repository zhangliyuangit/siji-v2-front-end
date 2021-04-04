<template>
    <div>
      <el-upload
        class="avatar-uploader"
        :action="updateImgPath"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
</template>

<script>
    import jwtDecode from "jwt-decode";

    export default {
        name: "UpdateAvatar",
      data(){
          return{
            updateImgPath: '',
            imageUrl: '',
          }
      },
      methods: {
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
          // 更新token
          if (res.code === 200) {
            this.$message({
              message: '更新成功，刷新页面即可看到效果',
              type: 'success'
            });
            window.localStorage.setItem("userToken", res.data)
          }
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
      },
      created() {
        this.updateImgPath = 'http://localhost:9999/siji/user/updateHeaderImg/' + jwtDecode(window.localStorage.getItem("userToken")).id
      }
    }
</script>

<style scoped>
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
