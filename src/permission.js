import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {
  Message
} from 'element-ui'
import {
  getToken
} from '@/utils/auth' // 验权


// console.log(store);

const whiteList = ['/login','/protocol','/register','/registerFeedback','/forgetPassword'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  document.title = "AssetChain"
  console.log(store)
  if (sessionStorage.getItem('token_front')) {
    // console.log(store.state.user)
    if (to.path === '/login') {
      console.log(1112111)
      console.log(to)
      console.log(222222)
      console.log(from)

      next({
        path: '/frontdashboard'
      });
    } else {
      if (!localStorage.getItem('user_front')) {
        store.dispatch('GetInfo').then(res => {
          console.log(1111)
          next()
        }).catch(error => {
          console.log(error)
        })
      } else {
        console.log(2222)
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }

  // next({ path: '/' })

})

router.afterEach(() => {
  // NProgress.done() // 结束Progress
})
