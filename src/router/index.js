import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Index from "../components/Index";
import PhoneLogin from "../components/login/PhoneLogin";
import PasswordLogin from "../components/login/PasswordLogin";
import ArticleList from "../components/ArticleList";
import QuestionList from "../components/QuestionList";
import AboutMe from "../components/AboutMe";
import ArticleDetails from "../components/ArticleDetails";
import ArticleSub from "../components/ArticleSub";
import ArticleAttention from "../components/ArticleAttention";
import WriteArticle from "../components/WriteArticle";

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
          path: '/questionList',
          component: QuestionList,
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
            requireAuth:true,
          },
        }
      ]
    },
    {
      path: '/writeArticle',
      component: WriteArticle,
      name:'writeArticle',
      meta: {
        requireAuth:true,
      },
    }
  ]
})
