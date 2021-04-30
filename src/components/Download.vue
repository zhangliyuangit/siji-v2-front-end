<template xmlns:el-col="http://www.w3.org/1999/html">
    <div id="upload">

      <el-row>
        <el-col :span="12" :offset="4">
          <el-card v-for="(file,index) in files" :key="index" shadow="never">
            <el-col :span="6">
              <div class="file-type">
                {{file.file_name.split(".")[1]}}
              </div>
            </el-col>
            <el-col :span="14">
              <div class="file-title">{{file.name}}</div>
            </el-col>
            <el-col :span="4">
              <span class="file-create-time">
                {{file.create_time}}
              </span>
              <el-button class="download-button" @click="downloadFile(file.id, file.file_name)">立即下载</el-button>
            </el-col>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card style="margin-left: 10px" shadow="never">
            <div style="height: 60px">
              <el-row>
                <el-col :span="12">
                  <el-avatar v-if="loginUser.header_pic != null" :src="loginUser.header_pic" size="large" class="header-pic"></el-avatar>
                  <el-avatar v-if="loginUser.header_pic == null" class="header-pic">{{loginUser.name}}</el-avatar>
                </el-col>
                <el-col :span="12" style="font-weight: 600">{{loginUser.name}}</el-col>
              </el-row>

              <el-row>
                <el-col>
                  <span v-text="'文件数：' + fileNums"></span>
                </el-col>
              </el-row>

              <el-row>
                <el-col>
                  <el-button @click="dialogVisible = true" class="upload-button" round>共享文件资源</el-button>
                </el-col>
              </el-row>

            </div>
            <div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 分页插件 -->
      <el-row>
        <el-col :span="12" :offset="4">
          <div style="width: 100%;text-align: center">
            <el-pagination
              layout="prev, pager, next "
              :total="page.total"
              :page-size="page.size"
              :current-page="page.current"
              @current-change="findPage"
              background
              style="margin-top: 30px">
            </el-pagination>
          </div>
        </el-col>
      </el-row>

      <!-- 上传弹框 -->
      <el-dialog
        title="上传文件"
        :visible.sync="dialogVisible"
        width="30%"
        center>

        <el-upload
          drag
          action="http://localhost:9999/siji/file/uploadFile"
          multiple
          class="upload"
          :on-success="uploadSuccess"
          :multiple="false">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>

        <el-dialog
          width="30%"
          title="请输入文件的详细信息"
          :visible.sync="innerVisible"
          append-to-body>
          <el-form :model="fileForm">
            <el-form-item>
              <el-input placeholder="请输入文件名称"
                        v-model="fileForm.name"
                        clearable></el-input>
            </el-form-item>

            <el-form-item>
              <el-button @click="submitUploadForm"
                         :disabled="fileForm.name == ''"
                         style="width: 100%">确定</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <span slot="footer" class="dialog-footer">
  </span>
      </el-dialog>
    </div>
</template>

<script>
  import jwtDecode from "jwt-decode";

  export default {
        name: "Download",
      data(){
          return {
            dialogVisible: false,
            fileForm: {
              file_name: '',
              name: '',
              user_id: 0,
            },
            innerVisible: false,
            files: [],
            // 分页对象
            page:{
              total: 0,// 总记录数
              size: 5,// 每页显示条数，默认为5
              current: 1,// 当前页码
              pages: 0// 总页数
            },
            loginUser: {
              header_pic: '',
              name: ''
            },
            // 当前用户上传的文件数
            fileNums: 0
          }
      },
      methods: {
        // 上传文件
        uploadSuccess(resp){
            // 弹出内层
            this.innerVisible = true
            this.fileForm.file_name = resp.data

        },
        submitUploadForm(){
            this.$http.post("http://localhost:9999/siji/file/saveFile",this.fileForm, {
              headers: {
                token: window.localStorage.getItem("userToken")
              }
            }).then(resp => {
              if (resp.data.code === 200) {
                // 消息提示
                this.$message({
                  message: '恭喜你，上传成功',
                  type: 'success'
                });
                this.dialogVisible = false;
                this.innerVisible = false;
              }else {
                this.$message.error('上传失败');
              }
            })
        },
        // 分页请求file数据
        filesByPage(currentPage, pageSize) {
            this.$http.get("http://localhost:9999/siji/file/page/" + currentPage + "/" + pageSize).then(resp => {
              if (resp.data.code === 200 ) {
                this.files = resp.data.data.records
                this.page.size = resp.data.data.size
                this.page.total = resp.data.data.total
                this.page.current = resp.data.data.current
                this.page.pages = resp.data.data.pages
              }
            })
        },
        // 下载文件
        downloadFile(fileId, fileName) {
          this.$http({
            url: 'http://localhost:9999/siji/file/download/' + fileId,
            method: 'post',
            responseType: 'arraybuffer'
          }).then((res) => {
            let url = window.URL.createObjectURL(new Blob([res.data]))
            let a = document.createElement('a')
            a.setAttribute("download",fileName)
            a.href = url
            a.click();
          })
        },
        findPage(pagenow) {
          this.page.current = pagenow
          this.filesByPage(pagenow, 5)
        },
      },
    created() {
          this.fileForm.user_id = jwtDecode(window.localStorage.getItem("userToken")).id
      // 首次加载第一页5条数据
      this.filesByPage(1,5)

      this.loginUser.header_pic = jwtDecode(window.localStorage.getItem("userToken")).header_pic
      this.loginUser.name = jwtDecode(window.localStorage.getItem("userToken")).name

      // 加载当前用户的文件数
      this.$http.get("http://localhost:9999/siji/file/fileNums/" + this.fileForm.user_id).then(resp => {
        this.fileNums = resp.data.data
      })
    }
  }
</script>

<style scoped>
.upload{
  width: 100%;
}
  #upload{
    font-family: pingfang-x;
  }
  .file-title{
    line-height: 75px;
    font-family: pingfang-x;
    font-weight: 800;
    font-size: 18px;
  }
  .download-button{
    margin-top: 10px;
    font-family: pingfang-x;
    background-color: #0066ff;
    color: white;
    margin-bottom: 10px;
  }
  .file-type{
    text-align: center;
    line-height: 60px;
    color: white;
    font-family: pingfang-x;
    font-weight: 600;
    border-radius: 5px;
    width: 50px;
    height: 60px;
    background: linear-gradient(135deg, transparent 10px, #2A6AB4 0);
  }

  .file-create-time{
    font-size: 13px;
  }
  .upload-button{
    width: 100%;
    margin-top: 10px;
    margin-bottom: 20px;
    background-color: #5c99f5;
    color: white;
    font-family: pingfang-x;
    font-weight: 600;
  }


</style>
