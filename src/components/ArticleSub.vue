<template>
  <div>
    <!-- 这里为了展示推荐文章和关注文章 -->
    <el-row>
      <el-col :span="16" :offset="4">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="推荐" name="/articleList"></el-tab-pane>
          <el-tab-pane label="关注" name="/articleAttention"></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <router-view></router-view>
  </div>


</template>

<script>
    export default {
        name: "ArticleSub",
      data(){
          return{
            activeName: this.$route.path
          }
      },
      methods: {
        handleClick(tab, event) {
          this.$router.push(tab.name)
        }
      }
    }
</script>

<style scoped>

</style>
