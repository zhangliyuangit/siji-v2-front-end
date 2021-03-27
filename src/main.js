// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// icon
import './assets/icon/iconfont.css'
// mavon-editor
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
// axios
import axios from 'axios';
// 字体
// 字体
import "./assets/font/Muyao-Softbrush.css"
import "./assets/font/DottedSongtiDiamondRegular.css"
import "./assets/font/摄图摩登小方体.css"
import './assets/font/pingfang-zc.css'
import './assets/font/pingfang-x.css'
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.prototype.$http = axios;


// 进入页面之前判断用户是否登录
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (window.localStorage.getItem('userToken')) {  // 获取用户登录信息
      next();
    }else {
      next({
        path: '/password',
        // query: {redirect: from.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

