<template>
  <div id="app">
    <el-container>
      <!-- 头部导航栏 -->
      <el-header>
        <el-menu :default-active="activeIndex"
                 class="el-menu-demo"
                 mode="horizontal"
                 @select="handleSelect"
                 router
                 text-color="#8590A6"
                 id="header">
          <el-menu-item style="font-weight: 800;color: #0066FF;font-size: 33px;margin-left: 8%;font-family: DottedSongtiDiamondRegular">肆记</el-menu-item>
          <el-menu-item index="/articleSub" style="margin-left: 20px" >首页</el-menu-item>
          <el-menu-item index="/questionList">等你来答</el-menu-item>
          <el-menu-item index="/about">关于作者</el-menu-item>

          <!-- 搜索框和提问按钮 -->
          <el-menu-item>
            <el-input style="margin-left: 30px" placeholder="请输入你要搜索的内容" id="search"><i slot="suffix" class="icon iconfont icon-sousuo2x" @click="doSearch" id="searchIcon"></i></el-input>
            <el-button type="primary" round id="searchBtn" plain @click="dialogVisible = true">提问</el-button>
          </el-menu-item>


          <el-menu-item id="no-login-item">
            <span>
              <el-dropdown @command="handleCommand" v-if="user.header_pic != ''" @error="errorHandler">
                <el-avatar v-if="user.header_pic != ''" :src="user.header_pic">
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                </el-avatar>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="myHome"><i class="icon iconfont icon-diannao2x"></i>我的主页</el-dropdown-item>
                  <el-dropdown-item command="write"><i class="icon iconfont icon-bianji2x"></i>写文章</el-dropdown-item>
                  <el-dropdown-item command="setting"><i class="icon iconfont icon-shezhi2x"></i>设置</el-dropdown-item>
                  <el-dropdown-item command="logout"><i class="icon iconfont icon-tuichu2x"></i>退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown @command="handleCommand" v-if="user.header_pic == ''">
                <el-avatar v-if="user.header_pic == ''" > {{user.name}} </el-avatar>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="myHome"><i class="icon iconfont icon-diannao2x"></i>我的主页</el-dropdown-item>
                  <el-dropdown-item command="write"><i class="icon iconfont icon-bianji2x"></i>写文章</el-dropdown-item>
                  <el-dropdown-item command="setting"><i class="icon iconfont icon-shezhi2x"></i>设置</el-dropdown-item>
                  <el-dropdown-item command="logout"><i class="icon iconfont icon-tuichu2x"></i>退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </el-menu-item>
        </el-menu>
      </el-header>



      <el-main>
        <router-view/>
      </el-main>
    </el-container>


    <!-- 问题弹框 -->
    <el-dialog
      title="请写下你的问题，五湖四海的朋友来帮你解答"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-input placeholder="请写下你的问题" type="textarea" maxlength="300"
                show-word-limit
                v-model="question"
      ></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="addQuestion" :disabled="question === ''">发布问题</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import jwtDecode from 'jwt-decode'
  export default {
    name: 'Index',
    data() {
      return {
        activeIndex: this.$route.path,
        dialogVisible: false,
        question: '',
        // 用于提交表单
        loginUser: {
          phone: '',
          password: '',
          captchaCode: '',
        },
        user:{
          header_pic: '',
          name: ''
        },
        // 验证码src
        captchaSrc: 'http://localhost:9999/siji/captcha/getCode?time=' + new Date()
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      doSearch() {
        alert("搜索触发")
      },
      // 添加评论
      addQuestion() {
        // TODO 1.发送axios请求 2.清空question内容 3.在session中去获取userId
      },
      // 下拉菜单选择函数
      handleCommand(command) {
        if (command === 'logout') {
          this.logout()
        } else if (command === 'write') {
          const { href } = this.$router.resolve({
            name: "writeArticle",
          });
          window.open(href, '_blank');
        } else if (command === 'setting') {
          const { href } = this.$router.resolve({
            name: "setting",
          });
          window.open(href, '_blank');
        }
      },
      // 登出
      logout() {
        // 清空localStorage
        window.localStorage.removeItem("userToken")
        // 跳转
        this.$router.push("/")
      },
      // 切换验证码
      changeCode() {
        this.captchaSrc = "http://localhost:9999/siji/captcha/getCode?time=" + new Date()
      },
      errorHandler() {
        return true
      }
    },
    mounted(){
      if (window.performance.navigation.type != 1) {
        const h = this.$createElement;

        this.$notify({
          title: '肆记',
          dangerouslyUseHTMLString: true,
          duration: 0, // 不会自动关闭
          // TODO 开源地址标记
          message: '<div><img src="https://cdn.jsdelivr.net/gh/zhangliyuangit/img/byau.jpg" alt="" height="80" width="80" style="margin-left: 60px"><b><div>本项目已经开源->  <a href="http://www.baidu.com">开源地址</a></div><div>如果本项目对您有帮助，请点击一个⭐</div></b></div>'
        });
      }
    },
    created() {
      this.isLogin = window.localStorage.getItem("userToken") == null;
      if (window.localStorage.getItem("userToken") != null) {
        this.user.header_pic = jwtDecode(window.localStorage.getItem("userToken")).header_pic
        this.user.name = jwtDecode(window.localStorage.getItem("userToken")).name
        this.user.id = jwtDecode(window.localStorage.getItem("userToken")).id
      }
    }
  }
</script>

<style>
  #header{
    font-weight: 600;
  }
  #search{
    border-radius: 20em;
    font-weight: 600;
  }
  #searchIcon:hover{
    color: #0066FF;
  }
  #searchBtn{
    font-weight: 600;
    margin-left: 39px;
  }
  #no-login-item{
    margin-left: 300px;
  }







  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar
  {
    width: 7px;  /*滚动条宽度*/
    height: 7px;  /*滚动条高度*/
    background-color: #fcfcfc;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #6192dd;  /*滚动条的背景颜色*/
  }

</style>

