<template>
    <div style="text-align: center;margin: auto;vertical-align: middle;">
      <div class="status-code">403</div>
      <div class="message">对不起您没有权限/(ㄒoㄒ)/~~</div>
      <el-button type="text" @click="$router.replace('/articleList')">返回首页</el-button>
    </div>
</template>

<script>
    export default {
        name: "NoAuthority"
    }
</script>

<style scoped>
  .status-code{
    color: #0066ff;
    font-family: Muyao-Softbrush;
    font-size: 60px;
    text-align: center;
    margin-top: 10%;
  }
  .message{
    text-align: center;
  }
</style>
