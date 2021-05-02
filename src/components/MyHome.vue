<template>
    <div>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="我的收藏" name="/myCollect"></el-tab-pane>
            <el-tab-pane label="我的点赞" name="/myLike"></el-tab-pane>
            <el-tab-pane label="我的文章" name="/myArticle"></el-tab-pane>
          </el-tabs>
          <el-card shadow="never">
            <router-view/>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "MyHome",
      data() {
        return {
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
