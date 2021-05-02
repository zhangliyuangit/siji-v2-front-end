<template>
    <!-- 收藏夹详情 -->
  <div id="favorite-details">
    <el-row>
      <el-col :span="12" :offset="4" >
        <el-card shadow="shadow" style="margin-bottom: 10px">
          <div id="favorite-title">{{currentFavorite.name}}</div>
          <div class="favorite-create-time">创建于{{currentFavorite.create_time}}</div>
          <div class="article-nums">{{articles.length}}个内容</div>
        </el-card>
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
      </el-col>
      <el-col :span="4">
        <el-card shadow="shadow" style="margin-left: 10px">
          <span style="font-weight: 600">我的收藏夹</span>
          <span class="show-all" @click="$router.push('/myCollect')">查看全部<i class="el-icon-arrow-right"></i></span>
          <div v-for="(favorite,index) in favorites" :key="index">
            <!-- TODO 这块不能实现跳转 -->
            <div class="favorite-titles" @click="$router.push('/favorite/' + favorite.id)">{{favorite.name}}</div>
            <div class="favorite-creates">创建于{{favorite.create_time}}</div>
          </div>
        </el-card>
      </el-col>

    </el-row>

  </div>
</template>

<script>
    import jwtDecode from "jwt-decode";

    export default {
        name: "FavoriteDetails",
      data(){
          return {
            articles: [],
            // 当前收藏夹
            currentFavorite: {},
            favorites: []
          }
      },
      methods: {},
      created() {
          // 加载收藏夹内容列表
          this.$http.get("http://localhost:9999/siji/collection/findCollectionContent/" + this.$route.params.id, {
            headers: {
              token: window.localStorage.getItem("userToken")
            }
          }).then(resp => {
            this.articles = resp.data.data
          })
        // 加载收藏夹信息
        this.$http.get("http://localhost:9999/siji/collection/get/" + this.$route.params.id, {
          headers: {
            token: window.localStorage.getItem("userToken")
          }
        }).then(resp => {
          this.currentFavorite = resp.data.data
        })
        // 加载所有收藏夹信息
        this.$http.get("http://localhost:9999/siji/collection/findFavorite/" + jwtDecode(window.localStorage.getItem("userToken")).id, {
          headers: {
            token: window.localStorage.getItem("userToken")
          }
        }).then(resp => {
          this.favorites = resp.data.data
        })
      }
    }
</script>

<style scoped>
  #favorite-details{
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
  #favorite-title{
    font-family: pingfang-x;
    font-size: 20px;
    font-weight: 600;
  }
  .favorite-create-time{
    color: #888787;
    font-size: 15px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .article-nums{
    /*margin-left: 10px;*/
    margin-top: 20px;
    font-weight: 600;
    font-size: 15px;
  }
  .show-all{
    float: right;
    font-size: 15px;
    font-weight: 600;
    color: #727171;
    cursor: pointer;
  }
  .favorite-titles{
    font-size: 15px;
    font-weight: 600;
    color: #727171;
    cursor: pointer;
    margin-top: 10px;
  }
  .favorite-creates{
    font-size: 10px;
  }

</style>
