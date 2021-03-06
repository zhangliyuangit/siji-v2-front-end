import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Index from "../components/Index";
import PhoneLogin from "../components/login/PhoneLogin";
import PasswordLogin from "../components/login/PasswordLogin";
import ArticleList from "../components/ArticleList";
import AboutMe from "../components/AboutMe";
import ArticleDetails from "../components/ArticleDetails";
import ArticleSub from "../components/ArticleSub";
import ArticleAttention from "../components/ArticleAttention";
import WriteArticle from "../components/WriteArticle";
import UserDetails from "../components/UserDetails";
import Setting from "../components/Setting";
import UpdateBasic from "../components/setting/UpdateBasic";
import UpdateAvatar from "../components/setting/UpdateAvatar";
import UpdatePassword from "../components/setting/UpdatePassword";
import ArticlesByType from "../components/ArticlesByType";
import Download from "../components/Download";
import MyHome from "../components/MyHome";
import MyArticle from "../components/myHome/MyArticle";
import MyCollect from "../components/myHome/MyCollect";
import MyLike from "../components/myHome/MyLike";
import FavoriteDetails from "../components/FavoriteDetails";
import UpdateArticle from "../components/UpdateArticle";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login,
      redirect: '/phone',
      children:[
        {
          path: '/phone',
          component: PhoneLogin
        },
        {
          path: '/password',
          component: PasswordLogin
        }
      ]
    },
    {
      path: '/index',
      component: Index,
      redirect: '/articleSub',
      children: [
        {
          path: '/articleSub',
          component: ArticleSub,
          redirect: '/articleList',
          children: [
            {
              // 推荐
              path: '/articleList',
              component: ArticleList,
              meta: {
                requireAuth:true,
              },
            },
            // 关注
            {
              path: '/articleAttention',
              component: ArticleAttention,
              meta: {
                requireAuth:true,
              },
            }
          ]
        },
        {
          path: '/download',
          component: Download,
          meta: {
            requireAuth:true,
          },
        },
        {
          path: '/about',
          component: AboutMe,
          meta: {
            requireAuth:true,
          },
        },
        {
          path: '/articleDetails/:id',
          component: ArticleDetails,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: '/userDetails/:id',
          component: UserDetails,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/setting',
          name: 'setting',
          component: Setting,
          redirect: '/updateBasic',
          meta: {
            requireAuth: true
          },
          children: [
            {
              path: '/updateBasic',
              component: UpdateBasic,
              meta: {
                requireAuth: true
              },
            },
            {
              path: '/updateAvatar',
              component: UpdateAvatar,
              meta: {
                requireAuth: true
              },
            },
            {
              path: '/updatePassword',
              component: UpdatePassword,
              meta: {
                requireAuth: true
              },
            }
          ]
        },
        {
          path: '/articleByType/:type',
          name: 'articleByType',
          component: ArticlesByType,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/myHome',
          name: 'myHome',
          component: MyHome,
          redirect: '/myCollect',
          meta: {
            requireAuth: true
          },
          children: [
            {
              path: '/myArticle',
              component: MyArticle,
              meta: {
                requireAuth: true
              }
            },
            {
              path: '/myCollect',
              component: MyCollect,
              meta: {
                requireAuth: true
              }
            },
            {
              path: '/myLike',
              component: MyLike,
              meta: {
                requireAuth: true
              }
            }
          ]
        },
        {
          path: '/favorite/:id',
          component: FavoriteDetails,
          meta: {
            requireAuth: true
          }
        },

      ]
    },
    {
      path: '/writeArticle',
      component: WriteArticle,
      name:'writeArticle',
      meta: {
        requireAuth:true,
      },
    },
    {
      path: '/updateArticle/:id',
      component: UpdateArticle,
      meta: {
        requireAuth: true
      }
    }
  ]
})
