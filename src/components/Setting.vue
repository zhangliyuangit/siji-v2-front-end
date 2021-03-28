<template>
    <div id="setting">
      <el-row>
        <el-col :span="16" :offset="4">
          <el-card>
            <h2>个人资料</h2>
            <el-divider></el-divider>
            <el-row>
              <el-col span="5">头像</el-col>
              <el-col span="19">
                <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "Setting"
    }
</script>

<style scoped>
  #setting{
    font-family: pingfang-x;
  }
</style>
