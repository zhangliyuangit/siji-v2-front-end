<template>
  <div id="app" v-loading="loading">
    <el-row>

      <el-col :span="4">
        <div style="width: 100%;height: 200px" v-if="article.user.id != currentUserId">
          <div id="button-list" v-if="!showCollection">
            <!-- 点赞按钮 -->
            <el-button circle
                       size="medium"
                      :class="article.isLike ? 'like' : 'noLike'"
                      @click="changeLike">
              <i class="icon iconfont icon-dianzan2x" style="font-size: 20px;"></i>
            </el-button>

            <div style="font-family: pingfang-x;margin-top: 5px;color: #0066ff;font-size: 15px;width: 100%;text-align: center"
                 v-text="article.isLike ? '已点赞' + article.likeNum : '去点赞' + article.likeNum"></div>
            <br>

            <!-- 评论按钮 -->
            <el-button circle size="medium" class="comment-btn" @click="toComment">
                <i class="icon iconfont icon-fankui2x" style="font-size: 20px;"></i>
            </el-button>
            <div style="font-family: pingfang-x;margin-top: 5px;color: #0066ff;font-size: 15px;width: 100%;text-align: center"
                 >评&nbsp;论</div>
            <br>

            <!-- 收藏按钮 -->
            <el-button circle size="medium" class="collect-btn" @click="showCollectionForm">
              <i class="icon iconfont icon-xing2x" style="font-size: 20px"></i>
            </el-button>
            <div style="font-family: pingfang-x;margin-top: 5px;color: #0066ff;font-size: 15px;width: 100%;text-align: center"
                 >收&nbsp;藏</div>
            <br>
          </div>
        </div>
      </el-col>

      <el-col :span="16" :offset="currentUserId == article.user.id ? 4 : 0">

        <el-row>
          <!-- 文章内容 -->
          <el-col :span="18" :offset="3">
            <div>
              <!-- 题图 -->
              <img v-if="article.thematic != null" :src="article.thematic" style="width: 100%"/>

              <!-- 文章标题 -->
              <h2>{{article.title}}</h2>

              <!-- 作者信息 -->
              <el-avatar v-if="article.user.header_pic != null" :src="article.user.header_pic" size="large" class="header-pic" @click="$router.push('/userDetails/' + article.user.id)"></el-avatar>
              <el-avatar v-if="article.user.header_pic == null" class="header-pic" @click="$router.push('/userDetails/' + article.user.id)">{{article.user.name}}</el-avatar>
              <span class="name" title="点击查看用户详情" style="margin-left: 20px;cursor: pointer" @click="$router.push('/userDetails/' + article.user.id)">{{article.user.name}}</span>
              <span style="float: right" v-if="currentUserId != article.user.id">
                <el-button round
                            @click="toAttention"
                           :type="article.isAttention ? 'primary' : ''"
                           v-text="article.isAttention ? '取消关注' : '关注'"
                           :class="article.isAttention ? 'attention' : 'noAttention'"
                >关注</el-button>
              </span>
              <span style="float: right" v-if="article.user.id == currentUserId">
                <el-popconfirm
                  title="您确定要删除文章吗？"
                  @confirm="deleteArticle"
                >
                  <el-link slot="reference">删除文章</el-link>
                </el-popconfirm>

              </span>

              <!-- 文章信息 -->
              <mavon-editor
                :value="article.context"
                defaultOpen="preview"
                :boxShadow="false"
                style="z-index:1;margin-top: 20px"
                :editable="false"
                :subfield="false"
                :toolbarsFlag="false"
              >
              </mavon-editor>
              <div class="creat-time">发布于{{article.create_time}}</div>

              <!-- 文章类型标签 -->
              <span v-if="article.types != null">
               <el-tag v-for="(type, index) in article.types" :key="index" class="article-type" @click="selectByTpye(type)">{{ type }}</el-tag>
              </span>

              <el-card shadow="never" style="margin-top: 20px" id="comment-list">

                <el-input style="margin-bottom: 20px;width: 80%"
                          placeholder="请输入评论内容"
                          id="comment-input"
                          v-model="comment"></el-input>
                <el-button style="width: 15%;margin-left: 2%;background-color: #E5EFFF;color: #0066FF"
                            :disabled="comment == ''"
                            @click="addComment">发布</el-button>

                <div v-if="article.comments === undefined || article.comments.length === 0">
                  <span>暂无评论...</span>
                </div>

                <div v-for="comment in article.comments">
                  <el-row>
                    <!-- 头像 -->
                    <el-col :span="2">
                      <el-avatar v-if="comment.user.header_pic != null" :src="comment.user.header_pic" size="medium" class="header-pic"></el-avatar>
                      <el-avatar v-if="comment.user.header_pic == null" class="header-pic" size="medium">{{comment.user.name}}</el-avatar>
                    </el-col>
                    <!-- name -->
                    <el-col :span="18">
                      <span style="line-height: 100%">{{comment.user.name}}</span>
                    </el-col>
                    <el-col :span="4">
                      <span>{{comment.create_time}}</span>
                    </el-col>
                  </el-row>

                  <!-- 评论内容 -->
                  <el-row style="margin: 10px">
                    <el-col :span="22">{{comment.context}}</el-col>
                    <el-col :span="2" v-if="currentUserId == comment.user_id">
                      <el-popconfirm
                        confirm-button-text='删除'
                        cancel-button-text='取消'
                        icon="el-icon-info"
                        icon-color="red"
                        title="您确定要删除吗？"
                        @confirm="deleteComment(comment.id)"
                      >
                        <el-link style="float: right" type="primary" slot="reference">删除</el-link>
                      </el-popconfirm>
                    </el-col>
                  </el-row>

                  <el-divider></el-divider>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>

        <!-- 收藏弹窗 -->
        <el-dialog
          title="添加收藏"
          :visible.sync="showCollection"
          width="30%">
          <div v-for="(collection, index) in favoritesList.data" style="height: 50px" :key="index">
            <el-row>
              <el-col :span="18" style="font-family: pingfang-x;font-size: 18px;color: #0c0c0c;line-height: 50px;font-weight: 500">{{collection.name}}</el-col>
              <el-col :span="6">
                <div style="width: 100%;height: 100%;vertical-align: middle">
                  <el-button v-text="collection.isCollect ? '已收藏' : '收藏'"
                             :class="collection.isCollect ? 'collect' : 'noCollect'"
                             @click="changeCollect(collection.id, collection.isCollect ,index)"></el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="width: 100%;text-align: center">
            <el-button style="background-color: #5c99f5;color: white;font-family: pingfang-x;font-weight: 500;margin-top: 20px;width: 100%"
            @click="showCreateCollection = true">创建收藏夹</el-button>
          </div>


          <el-dialog title="创建收藏夹" :visible.sync="showCreateCollection" append-to-body width="30%">
            <div style="width: 100%;text-align: center">
              <el-input placeholder="请输入收藏夹名称" style="font-family: pingfang-x" v-model="collectionName" clearable></el-input>
              <el-button style="background-color: #5c99f5;color: white;font-family: pingfang-x;font-weight: 500;margin-top: 20px;width: 100%"
                         @click="createFavorite"
                         :disabled="collectionName == ''">确认创建</el-button>
            </div>
          </el-dialog>
        </el-dialog>


        <!-- 回到顶部按钮 -->
        <el-backtop :bottom="100"></el-backtop>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import jwtDecode from 'jwt-decode'
    export default {
        name: "ArticleDetails",
      data(){
        return{
          favoritesList: {
          },
          article: {
            // 是否关注，默认位false
            isAttention: false,
            // 是否点赞
            isLike: false,
            user:{
              header_pic: ''
            },
            // 页面加载
            loading: false,
            comments: [
            ]
          },
          // 评论内容
          comment: '',
          // 是否展示收藏弹窗
          showCollection: false,
          showCreateCollection: false,
          // 收藏夹名称
          collectionName: '',
          // 当前登录用户id
          currentUserId: 0
        }
      },methods:{
        // 查看对应类型的所有文章
        selectByTpye(type) {
          this.$router.push("/articleByType/" + type)
        },
        // 关注事件
        toAttention(){
          var currentUserId = jwtDecode(window.localStorage.getItem("userToken")).id
          if (this.article.isAttention) {
            // 现在是关注状态，点击取消关注
            this.$http.delete("http://localhost:9999/siji/user/cancelAttention/" + currentUserId + "/" + this.article.user.id, {
              headers: {
                token: window.localStorage.getItem("userToken")
              }
            })
          }else {
            this.$http.post("http://localhost:9999/siji/user/toAttention/" + currentUserId + "/" + this.article.user.id, null, {
              headers: {
                token: window.localStorage.getItem("userToken")
              }
            })
          }
          // 切换按钮状态
          this.article.isAttention = !this.article.isAttention
        },
        // 切换点赞状态
        changeLike() {
          if (this.article.isLike) {
            // 是点赞状态，取消点赞
            this.$http.delete("http://localhost:9999/siji/like/noLike/" + this.article.id + "/" + jwtDecode(window.localStorage.getItem("userToken")).id, {
              headers: {
                token: window.localStorage.getItem("userToken")
              }
            }).then(resp => {
              if (resp.status === 200) {
                this.article.likeNum = this.article.likeNum - 1
                this.article.isLike = false
              }else {
                this.$message.error(resp.data.message)
              }
            })
          } else {
            // 没有点赞，去点赞
            this.$http.put("http://localhost:9999/siji/like/like/" + this.article.id + "/" + jwtDecode(window.localStorage.getItem("userToken")).id, null, {
              headers: {
                token: window.localStorage.getItem("userToken")
              }
            }).then(resp => {
              if (resp.status === 200) {
                this.article.likeNum = this.article.likeNum + 1
                this.article.isLike = true
              } else {
                this.$message.error(resp.data.message)
              }
            })
          }
        },
        // 跳转到页面底部的comment部分
        toComment() {
          const returnEle = document.querySelector("#comment-list");
          if (!!returnEle) {
            returnEle.scrollIntoView(true); // true 是默认的
          }
        },
        // 添加评论
        addComment() {
          const comment = {
            user_id: jwtDecode(window.localStorage.getItem("userToken")).id,
            article_id: this.article.id,
            context: this.comment
          }
          this.$http.post("http://localhost:9999/siji/comment/addAndGet", comment , {
            headers: {
              token: window.localStorage.getItem("userToken")
            }
          }).then(resp => {
            this.article.comments = resp.data.data
            this.comment = ''
          })
        },
        // 创建收藏夹
        createFavorite() {
          const collection = {
            user_id: jwtDecode(window.localStorage.getItem("userToken")).id,
            name: this.collectionName
          }
          this.$http.post("http://localhost:9999/siji/collection/create/" + this.article.id, collection, {
            headers: {
              token: window.localStorage.getItem("userToken")
            }
          }).then(resp => {
            this.favoritesList = resp.data
            this.showCreateCollection = false
            this.collectionName = ''
          })
        },
        // 展示弹窗，并且查询数据
        showCollectionForm() {
          const _this = this
          this.showCollection = true
          this.$http.get("http://localhost:9999/siji/collection/findCollection/" + jwtDecode(window.localStorage.getItem("userToken")).id + "/" + this.article.id, {
            headers: {
              token: window.localStorage.getItem("userToken")
            }
          }).then(resp => {
            this.favoritesList = resp.data
          })
        },
        // 切换收藏状态
        changeCollect(collectId, isCollect, index) {
          if (isCollect) {
            // 表示已经收藏过了，点击是取消收藏
            this.$http.delete("http://localhost:9999/siji/collection/cancelCollect/" + collectId + "/" + this.article.id, {
              headers: {
                token: window.localStorage.getItem("userToken")
              }
            })
            // 改变按钮的状态
            this.favoritesList.data[index].isCollect = false
          } else {
            // 去收藏
            const collectionContent = {
              collection_id: collectId,
              article_id: this.article.id
            }
            this.$http.post("http://localhost:9999/siji/collection/toCollect", collectionContent, {
              headers: {
                token: window.localStorage.getItem("userToken")
              }
            })
            // 改变按钮的状态
            this.favoritesList.data[index].isCollect = true
          }
        },
        // 删除文章
        deleteArticle() {
          this.$http.delete("http://localhost:9999/siji/article/deleteArticle/" + this.article.id, {
            headers: {
              token: window.localStorage.getItem("userToken")
            }
          }).then(resp => {
            if (resp.data.code === 200) {
              this.$message({
                message: resp.data.message,
                type: 'success'
              });
              // 跳转到首页
              this.$router.push("/articleList")
            } else {
              this.$message.error(resp.data.message);
            }
          })
        },
        // 删除评论
        deleteComment(commentId) {
          this.$http.delete("http://localhost:9999/siji/comment/deleteComment/" + commentId + "/" + this.article.id, {
            headers: {
              token: window.localStorage.getItem("userToken")
            }
          }).then(resp => {
            if (resp.data.code === 200) {
              this.article.comments = resp.data.data
            }
          })
        }
      },
      created() {
          this.currentUserId = jwtDecode(window.localStorage.getItem("userToken")).id
          this.loading = true
          var currentUserId = jwtDecode(window.localStorage.getItem("userToken")).id
        this.$http.get("http://localhost:9999/siji/article/" + this.$route.params.id + "?currentUserId=" + currentUserId, {
          headers: {
            token: window.localStorage.getItem("userToken")
          }
        }).then(resp => {
          this.article = resp.data.data;
          this.loading = false
        })
      }
    }
</script>

<style scoped>
  /*作者名称*/
  .article-author{
    font-size: 20px;
    font-weight: 600;
    vertical-align: middle;
    line-height: 30px;
    margin-left: 20px;
  }
  .article-author:hover{
    cursor: pointer;
  }
  .article-author-pic {
    vertical-align: middle;
  }

  .name{
    text-align: center;
    line-height: 50px;
    margin-left: 10px;
  }
  .header-pic{
    vertical-align: middle;
  }
  .creat-time{
    margin-top: 20px;
    color: #8590A6;
  }
  .article-type{
    margin-top: 20px;
    margin-left: 20px;
  }
  .article-type:hover{
    cursor: pointer;
  }

  /**关注按钮的颜色*/
  .attention{
    color: #fcfcfc;
    border: 1px solid #0066FF;
    font-size: 15px;
    font-family: pingfang-x;
    font-weight: 800;
  }
  .noAttention{
    color: #0066FF;
    font-size: 15px;
    font-family: pingfang-x;
    font-weight: 800;
  }
  .like{
    background-color: #0066FF;
    color: #fcfcfc;
  }
  .noLike{
    background-color: #E5EFFF;
    color: #0066FF;
  }
  .comment-btn{
    background-color: #E5EFFF;
    color: #0066FF;
  }
  .collect-btn{
    background-color: #E5EFFF;
    color: #0066FF;
  }
  .collect{
    vertical-align: middle;
    width: 100%;
    background-color: rgb(133,144,166);
    color: white;
    font-family: pingfang-x;
  }
  .noCollect{
    vertical-align: middle;
    width: 100%;
    font-family: pingfang-x;
    color: #0066FF;
  }


  #app{
    font-family: pingfang-x;
  }

  #button-list{
    top: 200px;
    z-index: 99999;
    position: fixed;
    left: 18%;
  }


</style>
