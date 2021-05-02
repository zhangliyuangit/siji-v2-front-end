<template>
    <div id="myArticle">
      <div v-for="(article,index) in articles" :key="index">
        <div class="article-title">{{article.title}}</div>
        <div>
          <span class="icon-btn"><i class="icon iconfont icon-dianzan2x"></i>&nbsp;{{article.likeNum}}</span>
          <span class="icon-btn"><i class="icon iconfont icon-fankui2x"></i>&nbsp;{{article.commentNum}}</span>

          <el-popconfirm
            confirm-button-text='删除'
            cancel-button-text='取消'
            icon="el-icon-info"
            icon-color="red"
            title="您确定要删除本篇文章吗?"
            @confirm="deleteArticle(article.id,index)"
          >
            <el-button type="danger" size="mini" class="remove-btn" slot="reference">
              <i class="icon iconfont icon-shanchu2x"></i>删除</el-button>
          </el-popconfirm>

          <el-button type="primary" size="mini" class="edit-btn" @click="$router.push('/updateArticle/' + article.id)">
            <i class="icon iconfont icon-bianji2x"></i>编辑
          </el-button>

        </div>
      </div>
    </div>
</template>

<script>
    import jwtDecode from "jwt-decode";

    export default {
        name: "MyArticle",
      data() {
          return {
            articles: []
          }
      },
      methods: {
          // 删除文章
        deleteArticle(id,index) {
          this.$http.delete("http://localhost:9999/siji/article/deleteArticle/" + id, {
            headers: {
              token: window.localStorage.getItem("userToken")
            }
          }).then(resp => {
            if (resp.data.code === 200) {
              this.$message({
                message: resp.data.message,
                type: 'success'
              });
              this.$http.get("http://localhost:9999/siji/article/findArticleByUserId/" + jwtDecode(window.localStorage.getItem("userToken")).id, {
                headers: {
                  token: window.localStorage.getItem("userToken")
                }
              }).then(resp =>  {
                this.articles = resp.data.data
              })
            } else {
              this.$message.error(resp.data.message);
            }
          })
        }
      },
      created() {
          this.$http.get("http://localhost:9999/siji/article/findArticleByUserId/" + jwtDecode(window.localStorage.getItem("userToken")).id, {
            headers: {
              token: window.localStorage.getItem("userToken")
            }
          }).then(resp =>  {
            this.articles = resp.data.data
          })
      }
    }
</script>

<style scoped>
  #myArticle{
    font-family: pingfang-x;
  }
  .article-title{
    font-size: 20px;
    font-family: PingFang;
    font-weight: 500;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .icon-btn{
    margin-top: 10px;
    color: #0066ff;
    margin-left: 20px;
  }
  .remove-btn{
    float: right;
    font-size: 15px;
    font-family: pingfang-x;
  }
  .edit-btn{
    float: right;
    margin-right: 20px;
    font-size: 15px;
    font-family: pingfang-x;

  }

</style>
