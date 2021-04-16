<template>
    <div id="articleByType">
      <el-row>
        <el-col :span="16" :offset="4">
          <div>
            <div style="text-align: center;font-size: 30px;font-weight: 600;margin-top: 20px">{{type}}</div>
            <div style="text-align: center;font-size: 11px;margin-bottom: 20px">{{articleNums}}篇文章</div>
          </div>

          <div>
            <!-- 有题图的情况 -->
            <el-card :body-style="{ padding: '0px' }" shadow="hover" v-for="(article,index) in articles" :key="index">
              <div style="padding-left: 14px;padding-top: 20px;padding-right: 20px" v-if="article.thematic != null">
                <el-link :underline="false" @click.prevent="$router.push(`/articleDetails/` + article.id)"><span class="article-title" title="点击阅读全文">{{article.title}}</span></el-link>
                <div class="bottom clearfix" style="margin-top: 10px">
                  <el-row>
                    <el-col :span="7">
                      <img v-if="article.thematic != null" :src="article.thematic" style="height: 100px;width: 80%;margin-bottom: 20px"/>
                    </el-col>
                    <el-col :span="17" style="margin-bottom: 20px">
                      <span style="margin-bottom: 20px" class="article-class">{{ article.overview }}</span>
                    </el-col>
                  </el-row>
                </div>
              </div>

              <!-- 没有题图的情况 -->
              <div style="padding-left: 14px;padding-top: 20px;padding-right: 20px" v-if="article.thematic == null">
                <el-link :underline="false" @click.prevent="$router.push(`/articleDetails/` + article.id)"><span class="article-title" title="点击阅读全文">{{article.title}}</span></el-link>
                <div class="bottom clearfix" style="margin-top: 10px">
                  <el-row>
                    <el-col :span="24" style="margin-bottom: 20px">
                      <span style="margin-bottom: 20px" class="article-class">{{ article.overview }}</span>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "ArticlesByType",
      data() {
          return {
            type: '',
            articles: [],
            articleNums: 0
          }
      },
      created() {
        this.type = this.$route.params.type
        this.$http.get("http://localhost:9999/siji/article/findArticleByType/" + this.type, {
          headers: {
            token: window.localStorage.getItem("userToken")
          }
        }).then(resp => {
          this.articles = resp.data.data;
          this.articleNums = this.articles.length
        })
      }
    }
</script>

<style scoped>
  #articleByType{
    font-family: pingfang-x;
  }
  .article-title{
    font-size: 17px;
    font-weight: 800;
    color: #111111;
  }
  .article-class{
    font-size: 14px;
  }

</style>
