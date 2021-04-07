<template xmlns:el-col="http://www.w3.org/1999/html">
    <div id="login">

      <el-row>
        <el-col :span="6" :offset="9">
          <div style="width: 100%;margin-top: 30px;text-align: center">
            <div class="title">肆记</div>
            <span class="title-2">记录您的四季</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="9">
            <el-card style="height: 330px;margin-top: 10%">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="免密码登录" name="/phone"></el-tab-pane>
                <el-tab-pane label="密码登录" name="/password"></el-tab-pane>
              </el-tabs>
              <router-view/>
            </el-card>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10" :offset="7">
          <div style="text-align: center;margin-top: 16%;margin-bottom: 50px">power by liyuan.zhang</div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "Login",
      data() {
          return {
            activeName: this.$route.path
          }
      },
      methods: {
        handleClick(tab, event) {
          this.$router.push(tab.name)
        }
      },
      created() {
          console.log(
            "岁月静好是片刻,\n" +
            "一地鸡毛是日常,\n" +
            "即使世界偶尔薄凉,\n" +
            "内心也要繁花似锦,\n" +
            "浅浅喜,静静爱,\n" +
            "深深懂得淡淡释怀,\n" +
            "望远处的是风景,\n" +
            "看近处的才是人生,\n" +
            "唯愿此生岁月无恙,\n" +
            "只言温暖不与悲伤.\n")
      }
    }
</script>

<style scoped>
  .title{
    font-family: DottedSongtiDiamondRegular;
    font-size: 80px;
    text-align: center;
    color: #5c99f5;
    padding-top: 20px;
  }
  .title-2{
    margin-top: 10px;
    font-size: 13px;
  }
  #login{
    height: 100%;
    background-image: url("../assets/img/默认文件1616821660205.png");
    background-repeat: repeat;
  }
</style>
