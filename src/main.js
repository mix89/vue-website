import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n


import '@/styles/index.scss' // global css
import '@/styles/common.scss' //common css  //公共样式
import '@/styles/form.scss' //form css //表单样式
import '@/styles/login.scss' //login css  //登录页面，协议页面
import '@/styles/register.scss' //register //注册样式
import '@/styles/frontdashboard.scss'  //登录后首页样式
import '@/styles/personalCenter.scss' // 个人中心页面样式
import '@/styles/whreceiptManage.scss'  //仓单样式

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import * as filters from './utils/filters'



window.uploadUrl = process.env.BASE_API + '/api/upload/uploadFile'
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false


Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

 new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})


