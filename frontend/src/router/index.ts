import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { defineAsyncComponent } from 'vue';
import Articles from '../components/pages/Articles.vue';
import ArticleDetails from '../components/pages/ArticleDetails.vue';
import {isAuth} from '../hooks/auth';

const Auth = defineAsyncComponent(() =>import('../components/pages/Auth.vue'));
const AddArticle = defineAsyncComponent(() =>import('../components/pages/AddArticle.vue'));
const NotFound =defineAsyncComponent(()=> import('../components/pages/NotFound.vue'));

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/articles'
  },
  {
    path: '/articles',
    component: Articles
  },
  {
    path: '/articles/:id',
    component: ArticleDetails,
    props:true,
    meta:{requiresAuth:true}
  },
  {
    path: '/auth',
    component: Auth
  },
  {
    path: '/add',
    component: AddArticle,
    meta:{requiresAuth:true}
  },
  { path: '/:notFound(.*)', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach((to,_,next)=>{
  if(to.meta.requiresAuth && !isAuth.value){
    next('/auth');
  } else {
    next();
  }
});

export default router;