<template>
    <div id="myCollect">
      <div v-for="(favorite, index) in favorites" :key="index">
        <span class="favorite-title" @click="$router.push('/favorite/' + favorite.id)">{{favorite.name}}</span>
        <br>
        <span class="favorite-create-time">{{favorite.create_time}}&nbsp;创建</span>
        <el-button type="primary" size="mini" class="favorite-update-button" @click="showUpdateAlert(index)">
          <i class="icon iconfont icon-bianji2x"></i>编辑
        </el-button>
        <el-popconfirm
          confirm-button-text='是的'
          cancel-button-text='不用了'
          icon="el-icon-info"
          icon-color="red"
          title="您确定要删除这个收藏夹，以及删除收藏夹的所有内容吗?"
          @confirm="deleteFavorite(favorite.id)"
        >
          <el-button type="danger" size="mini" slot="reference" class="favorite-delete-button"><i class="icon iconfont icon-shanchu2x"></i>删除</el-button>
        </el-popconfirm>
        <el-divider></el-divider>
      </div>

      <!-- 更新收藏夹弹窗 -->
      <el-dialog
        title="修改收藏夹名称"
        :visible.sync="showUpdate"
        width="30%"
        >
        <el-input v-model="updateName"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showUpdate = false">取 消</el-button>
        <el-button type="primary" @click="updateFavoriteFunction">确 定</el-button>
  </span>
      </el-dialog>
    </div>
</template>

<script>
    import jwtDecode from "jwt-decode";

    export default {
        name: "MyCollect",
      data() {
        return {
          favorites: [],
          // 弹框控制
          showUpdate: false,

          updateName: '',
          updateId: 0,
        }
      },
      methods: {
          // 展示更新弹窗
        showUpdateAlert(index){
          this.updateName = this.favorites[index].name
          this.updateId = this.favorites[index].id
          this.showUpdate = true;
        },
        // 更新收藏夹方法
        updateFavoriteFunction() {
          if (this.updateName !== '') {
            var collection = {
              id: this.updateId,
              name: this.updateName
            }
            this.$http.post("http://localhost:9999/siji/collection/update", collection, {
              headers: {
                token: window.localStorage.getItem("userToken")
              }
            }).then(resp => {
              if (resp.data.code === 200) {
                // 重新加载
                this.$message({
                  message: '恭喜你，修改成功',
                  type: 'success'
                });
                this.$http.get("http://localhost:9999/siji/collection/findFavorite/" + jwtDecode(window.localStorage.getItem("userToken")).id, {
                  headers: {
                    token: window.localStorage.getItem("userToken")
                  }
                }).then(resp => {
                  this.favorites = resp.data.data
                })
                // 关闭弹窗
                this.showUpdate = false
              }
            })
          }
        },
        // 删除收藏夹
        deleteFavorite(id) {
          this.$http.delete("http://localhost:9999/siji/collection/delete/" + id, {
            headers: {
              token: window.localStorage.getItem("userToken")
            }
          }).then(resp => {
            // 重新加载
            // TODO 可以直接在对应数组整移除掉对应的元素
            this.$message({
              message: '恭喜你，删除成功',
              type: 'success'
            });
            this.$http.get("http://localhost:9999/siji/collection/findFavorite/" + jwtDecode(window.localStorage.getItem("userToken")).id, {
              headers: {
                token: window.localStorage.getItem("userToken")
              }
            }).then(resp => {
              this.favorites = resp.data.data
            })
          })
        }
      },
      created() {
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

  #myCollect{
    font-family: pingfang-x;
  }
  .favorite-title{
    font-weight: 600;
    font-size: 20px;
    margin-left: 10px;
    cursor: pointer;
  }
  .favorite-create-time{
    margin-left: 10px;
    line-height: 50px;
    font-size: 15px;
  }
  .favorite-update-button{
    margin-left: 60%;
    /*line-height: 50px;*/
    font-size: 15px;
    cursor: pointer;
    /*background-color: #5c99f5;*/
    color: white;
    font-family: pingfang-x;

  }
  .favorite-delete-button{
    margin-left: 10px;
    /*line-height: 50px;*/
    font-size: 15px;
    cursor: pointer;
    /*background-color: #ea8888;*/
    color: white;
    font-family: pingfang-x;

  }
</style>
