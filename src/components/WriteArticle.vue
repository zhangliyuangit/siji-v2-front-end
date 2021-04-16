<template>
  <!-- 写文章 -->
    <div>
      <el-row>
        <!-- 标题 -->
        <el-col>
          <div style="width: 100%;height: 50px;border-bottom: 1px solid #cccccc">
            <span class="title">肆记|<span style="margin-left: 10px;
            font-weight: 300;
            font-family: pingfang-x;
            font-size: 16px;
            line-height: 50px;
            color: #111111;
            ">写文章</span></span>

            <el-button style="margin-left: 60%;font-family: pingfang-x" type="primary" :disabled="content === ''" @click="submitAndSelectTypes">发布</el-button>
          </div>
        </el-col>
        <el-col :span="16" :offset="4" style="margin-top: 20px">
          <mavon-editor
            ref="md"
            placeholder="请输入文档内容..."
            :boxShadow="false"
            style="z-index:1;border: 1px solid #d9d9d9;height:650px"
            v-model="content"
            :toolbars="toolbars"
          />
        </el-col>
      </el-row>


      <!-- 弹出框 -->
      <el-drawer
        style="font-family: pingfang-x"
        title="肆记"
        :visible.sync="drawer"
        direction="rtl">
        <el-form label-width="70px" style="width: 100%" v-model="article">
          <el-form-item label="标题" >
            <el-input v-model="article.title" placeholder="请输入标题" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="article.overview"
                      type="textarea"
                      placeholder="请输入文章简介"
                      :autosize="{ minRows: 10, maxRows: 12}"
                      maxlength="300"
                      show-word-limit
                      style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="题图地址" >
            <el-input v-model="article.thematic" placeholder="题图地址暂时只支持网络url形式" style="width: 80%"></el-input>
            <el-tooltip content="这里暂时只支持图片的url地址，后续可能要优化成上传图片的形式" placement="bottom" effect="light" style="margin-left: 10px">
              <i class="icon iconfont icon-xinxi2x"></i>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="类型">
            <el-select
              v-model="article.types"
              multiple
              style="width: 80%"
              filterable
              allow-create
              default-first-option
              placeholder="请选择文章类型">
              <el-option
                v-for="item in allTypes"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>

            <!-- 提示信息 -->
            <el-tooltip content="这里支持自定标签，键入之后回车即可" placement="bottom" effect="light" style="margin-left: 10px">
              <i class="icon iconfont icon-xinxi2x"></i>
            </el-tooltip>
          </el-form-item>

          <el-form-item style="margin-top: 30px">
            <el-button style="width: 80%"
                       type="primary"
                       :disabled="article.title == '' || article.overview == '' || article.thematic == '' || article.types.length == 0"
                        @click="issueArticle">提交</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>
</template>

<script>
    import jwtDecode from "jwt-decode";

    export default {
        name: "WriteArticle",
      data() {
        return {
          content: '',
          // 文章对象
          article: {
            title: '',
            overview: '',
            thematic: '',
            // 文章类型
            types: [],
          },
          // 全部文章类型
          allTypes: [],
          // 是否展示弹窗
          drawer: false,
          toolbars: {
            bold: true, // 粗体
            italic: true, // 斜体
            header: true, // 标题
            underline: true, // 下划线
            strikethrough: true, // 中划线
            mark: true, // 标记
            superscript: true, // 上角标
            subscript: true, // 下角标
            quote: true, // 引用
            ol: true, // 有序列表
            ul: true, // 无序列表
            link: true, // 链接
            imagelink: true, // 图片链接
            code: true, // code
            table: true, // 表格
            fullscreen: true, // 全屏编辑
            readmodel: true, // 沉浸式阅读
            htmlcode: true, // 展示html源码
            help: true, // 帮助
            /* 1.3.5 */
            undo: true, // 上一步
            redo: true, // 下一步
            trash: true, // 清空
            save: false, // 保存（触发events中的save事件）
            /* 1.4.2 */
            navigation: true, // 导航目录
            /* 2.1.8 */
            alignleft: true, // 左对齐
            aligncenter: true, // 居中
            alignright: true, // 右对齐
            /* 2.2.1 */
            subfield: true, // 单双栏模式
            preview: true // 预览
          },
        };
      },
      methods: {
        // 上传图片方法
        $imgAdd(pos, $file) {
          console.log(pos, $file);
        },
        // 弹出提交文章侧边栏，并查询类型
        submitAndSelectTypes() {
          // 展示弹窗
          this.drawer = true
          this.$http.get("http://localhost:9999/siji/type/getAllTypes",{
            headers: {
              token: window.localStorage.getItem("userToken")
            }
          }).then(resp => {
            this.allTypes = resp.data.data
          })
        },
        // 提交文章
        issueArticle() {
          // 封装一个article对象
          const articleEntity = {
            title: this.article.title,
            overview: this.article.overview,
            thematic: this.article.thematic,
            context: this.content,
            types: this.article.types,
            user_id: jwtDecode(window.localStorage.getItem("userToken")).id
          };

          // 保存文章
          this.$http.post("http://localhost:9999/siji/article/save", articleEntity, {
            headers: {
              token: window.localStorage.getItem("userToken")
            }
          }).then(resp => {
            if (resp.data.code === 200) {
              this.$message({
                message: resp.data.message,
                type: 'success'
              });
              this.$router.push("/articleDetails/" + resp.data.data)
            }else {
              this.$message.error(resp.data.message);
            }
          })
        }
      },
    }
</script>

<style scoped>
  .title{
    font-family: DottedSongtiDiamondRegular;
    font-size: 30px;
    color: #0066FF;
    font-weight: 800;
    line-height: 50px;
    margin-left: 12%;
  }
</style>
