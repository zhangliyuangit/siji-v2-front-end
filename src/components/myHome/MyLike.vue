<template>
    <div>
      <el-collapse>
        <el-collapse-item :name="type" v-for="(type, index) in types" :key="index">
          <template slot="title">
            <div class="type">{{type}}</div>
          </template>
<!--          <div v-for="article in articleByType[type]">{{article.title}}</div>-->


              <el-card :body-style="{ padding: '0px' }" shadow="hover" v-for="(article,index) in articleByType[type]" :key="index">
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
        </el-collapse-item>
      </el-collapse>
    </div>
</template>

<script>
    import jwtDecode from "jwt-decode";

    export default {
        name: "MyLike",
      data() {
          return{
            articleByType: {},
            types: []
          }
      },
      methods: {},
      created() {
          this.$http.get("http://localhost:9999/siji/article/getArticleByLikeAndType/" + jwtDecode(window.localStorage.getItem("userToken")).id, {
            headers: {
              token: window.localStorage.getItem("userToken")
            }
          }).then(resp => {
            this.articleByType = resp.data.data
            for (var key in this.articleByType) {
              this.types.push(key)
              console.log(this.articleByType[key])
            }
          })
      }
    }
</script>

<style scoped>
  .type{
    font-size: 20px;
    font-weight: 600;
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
