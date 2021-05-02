<template>
    <div id="updateArticle" v-loading="loading">
      <!-- 如果当前用户id和文章的用户id不符合，无法修改 -->
<!--      <NoAuthority v-if="article.user.id != currentUserId"/>-->

      <div >
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
            ">{{article.title}}</span></span>

              <el-button style="margin-left: 60%;font-family: pingfang-x" type="primary" :disabled="article.context === ''" @click="drawer = true">保存</el-button>
            </div>
          </el-col>
          <el-col :span="16" :offset="4" style="margin-top: 20px">
            <mavon-editor
              ref="md"
              placeholder="请输入文档内容..."
              :boxShadow="false"
              style="z-index:1;border: 1px solid #d9d9d9;height:650px"
              v-model="article.context"
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
              <el-input v-model="article.title" placeholder="请输入标题" style="width: 80%" clearable></el-input>
            </el-form-item>
            <el-form-item label="简介">
              <el-input v-model="article.overview"
                        type="textarea"
                        placeholder="请输入文章简介"
                        :autosize="{ minRows: 10, maxRows: 12}"
                        maxlength="300"
                        show-word-limit
                        style="width: 80%"
                        clearable></el-input>
            </el-form-item>
            <el-form-item label="题图地址" >
              <el-input v-model="article.thematic" placeholder="题图地址暂时只支持网络url形式" style="width: 80%" clearable></el-input>
              <el-tooltip content="这里暂时只支持图片的url地址，后续可能要优化成上传图片的形式" placement="bottom" effect="light" style="margin-left: 10px">
                <i class="icon iconfont icon-xinxi2x"></i>
              </el-tooltip>
            </el-form-item>

            <el-form-item label="类型">
            <el-tag v-for="tag in article.types">{{tag}}</el-tag>
            </el-form-item>

            <el-form-item style="margin-top: 30px">
              <el-button style="width: 80%"
                         type="primary"
                         :disabled="article.title == '' || article.overview == '' || article.thematic == ''"
                         @click="updateArticle" :loading="isLoading">提交</el-button>
            </el-form-item>
          </el-form>
        </el-drawer>
      </div>
    </div>
</template>

<script>
    import jwtDecode from "jwt-decode";
    import NoAuthority from "./NoAuthority";

    export default {
        name: "UpdateArticle",
      components: {NoAuthority},
      data() {
          return{
            isLoading: false,
            article: {},
            currentUserId: 0,
            loading: false,
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
              fullscreen: false, // 全屏编辑
              readmodel: true, // 沉浸式阅读
              htmlcode: true, // 展示html源码
              help: true, // 帮助
              /* 1.3.5 */
              undo: true, // 上一步
              redo: true, // 下一步
              trash: true, // 清空
              save: false, // 保存（触发events中的save事件）
              /* 1.4.2 */
              navigation: false, // 导航目录
              /* 2.1.8 */
              alignleft: true, // 左对齐
              aligncenter: true, // 居中
              alignright: true, // 右对齐
              /* 2.2.1 */
              subfield: false, // 单双栏模式
              preview: false // 预览
            },
          }
      },
      methods: {
          // 修改文章
        updateArticle() {
          this.isLoading = true
          var articleVo = {
            id: this.article.id,
            title: this.article.title,
            context: this.article.context,
            thematic: this.article.thematic,
            overview: this.article.overview
          }
          this.$http.post("http://localhost:9999/siji/article/update/article", articleVo, {
            headers: {
              token: window.localStorage.getItem("userToken")
            }
          }).then(resp => {
            if (resp.data.code === 400) {
              this.$message.error(resp.data.message);
            }else {
              this.$message({
                message: '恭喜你，修改成功',
                type: 'success'
              });
              // 跳转
              this.$router.push('/articleDetails/' + this.article.id)
              this.isLoading = false
            }
          })
        },
      },
      created() {
          this.loading = true;
          this.currentUserId = jwtDecode(window.localStorage.getItem("userToken")).id
        this.$http.get("http://localhost:9999/siji/article/" + this.$route.params.id + "?currentUserId=" + jwtDecode(window.localStorage.getItem("userToken")).id, {
            headers: {
              token: window.localStorage.getItem("userToken")
            }
          }).then(resp => {
            this.article = resp.data.data
          this.loading = false
          })
      }
    }
</script>

<style scoped>
  #updateArticle{
    font-family: pingfang-x;
  }
  .title{
    font-family: DottedSongtiDiamondRegular;
    font-size: 30px;
    color: #0066FF;
    font-weight: 800;
    line-height: 50px;
    margin-left: 12%;
  }

</style>
