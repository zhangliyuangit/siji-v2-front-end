<template>
  <div id="app" v-loading="loading">
    <!-- 容器套容器，为了实现旁边留白效果 -->
    <el-row>
      <el-col :span="16" :offset="4">
        <el-row>
          <!-- 文章列表 -->
          <el-col :span="18">
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


            <!-- 分页插件 -->

            <el-pagination
              layout="prev, pager, next, jumper, total, sizes "
              :total="page.total"
              :page-size="page.size"
              :current-page="page.current"
              :page-sizes="[5,10,15]"
              @size-change="findSize"
              prev-text="上一页"
              next-text="下一页"
              @current-change="findPage"
              background
              style="margin-top: 30px"
              v-if="articles.length !== 0">
            </el-pagination>

            <div v-if="articles.length === 0" style="margin-top: 20%;width: 100%;text-align: center"><i class="icon iconfont icon-jinggao2x" style="color: red;font-size: 20px"></i>  您没有关注任何人</div>
          </el-col>

          <!-- 右侧边栏 -->
          <el-col :span="6">
            <el-card class="box-card" shadow="never" style="margin-left: 10px">
              <div slot="header" class="clearfix">
                <span>作者榜🏆</span>
              </div>
              <div v-for="(user, index) in users" :key="index" class="text item" @click="$router.push('/userDetails/' + user.id)">
                <el-avatar v-if="user.header_pic != null" :src="user.header_pic" size="large" class="header-pic"></el-avatar>
                <el-avatar v-if="user.header_pic == null" class="header-pic">{{user.name}}</el-avatar>
                <span class="name">{{user.name}}</span>
              </div>
            </el-card>


            <el-menu style="margin-top: 20px;margin-left: 10px;">
              <el-menu-item index="about">
                <i class="el-icon-copy-document"></i>
                <a href="https://zhangliyuanblog.club/" target="_blank">关于作者</a>
              </el-menu-item>
              <el-menu-item index="address">
                <i class="el-icon-link"></i>
                <a href="https://gitee.com/zhangliyuanblog/siji-v2" target="_blank">开源地址</a>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import jwtDecode from "jwt-decode";

    export default {
        name: "ArticleAttention",
      data() {
        return {
          // 页面加载
          loading: false,
          currentDate: new Date(),
          articles: [],
          // 用于分页
          page:{
            total: 0,// 总记录数
            size: 5,// 每页显示条数，默认为5
            current: 1,// 当前页码
            pages: 0// 总页数
          },
          // 用户榜单
          users: []
        };
      },
      methods: {
        share() {
          alert("分享事件")
        },
        collect() {
          alert("收藏事件")
        },
        findSize(pageSize) {
          this.page.size = pageSize
          this.findArticles(this.page.current, pageSize)
        },
        findPage(pagenow) {
          this.page.current = pagenow
          this.findArticles(pagenow, 5)
        },
        // 分页查找文章
        findArticles(pageNow, pageSize) {
          this.$http.get("http://localhost:9999/siji/article/attention/" + pageNow + "/" + pageSize + "/" + jwtDecode(window.localStorage.getItem("userToken")).id, {
            headers: {
              token: window.localStorage.getItem("userToken")
            }
          }).then(resp => {
            this.articles = resp.data.data.records
            this.page.size = resp.data.data.size
            this.page.total = resp.data.data.total
            this.page.current = resp.data.data.current
            this.page.pages = resp.data.data.pages
          })
        },
      },
      created() {
          this.loading = true
        // 默认加载第一页
        this.findArticles(1,5)
        this.$http.get("http://localhost:9999/siji/user/ranking", {
          headers: {
            token: window.localStorage.getItem("userToken")
          }
        }).then(resp => {
          this.users = resp.data.data;
        })
        this.loading = false
      }
    }
</script>

<style scoped>
  .article-title{
    font-size: 17px;
    font-weight: 800;
    color: #111111;
  }
  .article-class{
    font-size: 14px;
  }
  .like-btn{
    font-weight: 600;
    font-size: 13px;
  }
  .share{
    font-size: 13px;
    font-weight: 600;
    margin-left: 20px;
    color: #8590A6;
    cursor: pointer;
  }
  .share:hover{
    color: #0066FF;
  }

  /*作者榜*/
  .text{
    margin-top: 8px;
    margin-bottom: 8px;
    height: 50px;
  }
  .name{
    text-align: center;
    line-height: 50px;
    margin-left: 10px;
  }
  .header-pic{
    margin-left: 10px;
    vertical-align: middle;
  }
  .text:hover{
    background: #e6e8ee;
    cursor: pointer;
  }
  a{
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
  }
</style>
