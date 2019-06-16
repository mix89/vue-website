import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import Home from '../views/layout/components/Home';
import PersonalCenter from '../views/personalCenter';
import PersonalCenterThird from '../views/personalCenter/thirdIndex';


/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  //  { path: '/demo', component: () => import('@/views/login/demo'), name:"demo" },
   { path: '/login', component: () => import('@/views/login/index'), name:"login" },
   { path: '/protocol', component: () => import('@/views/login/protocol'), name:"protocol" },
   { path: '/register', component: () => import('@/views/register'), name:"register"},
   { path: '/registerFeedback', component: () => import('@/views/register/feedback'), name:"registerFeedback"},
   { path: '/forgetPassword', component: () => import('@/views/register/forgetpassword'), name:"forgetPassword"},
  // { path: '/404', component: () => import('@/views/404'), hidden: true },

  // { path: '/page2', component: () => import('@/views/frontdashboard/page2'),name:"page2"},

  {
    path: '/',
    redirect:'/frontdashboard',
    component:Home,
    children:[

          { path: '/frontdashboard',
           component: () => import('@/views/frontdashboard/index'),name:"frontdashboard",
          },
          {
          path: '/personalCenter',
          component:PersonalCenter,
          redirect:'/companyAccount',
          name:'personalCenter',
          children:[
            { path: '/companyAccount', component: () => import('@/views/personalCenter/companyAccount'),name:"companyAccount"},
            { path: '/companyAccountEdit', component: () => import('@/views/enterpriseUserManage/edit'),name:"companyAccountEdit"},
            { path: '/staffAccount', component: () => import('@/views/personalCenter/staffAccount'),name:"staffAccount"},
          ]
        },
        {
          path: '/personalCenterThird',
          component:PersonalCenterThird,
          redirect:'/companyAccountThird',
          name:'PersonalCenterThird',
          children:[
            { path: '/companyAccountThird', component: () => import('@/views/personalCenter/companyAccountThird'),name:"companyAccountThird"},
          ]

        },


      { path: '/whreceiptList', component: () => import('@/views/whreceiptManage/list'),name:"whreceiptList"},
//融资方
  // 仓单
      //企业管理员
      { path: '/whreceiptManageAdminList', component: () => import('@/views/whreceiptManage/admin/list'),name:"whreceiptManageAdminList"},
      //企业审核员
      { path: '/whreceiptManageCheckList', component: () => import('@/views/whreceiptManage/check/list'),name:"whreceiptManageCheckList"},
      //企业录入员
      { path: '/whreceiptManageUserList', component: () => import('@/views/whreceiptManage/user/list'),name:"whreceiptManageUserList"},

      // { path: '/whreceiptBasicsManageList', component: () => import('@/views/whreceiptManage/financing/list'),name:"whreceiptBasicsManageList"},
      { path: '/whreceiptBasicsManageAdd', component: () => import('@/views/whreceiptManage/financing/add'),name:"whreceiptBasicsManageAdd"},
      { path: '/whreceiptBasicsManageShow', component: () => import('@/views/whreceiptManage/financing/show'),name:"whreceiptBasicsManageShow"},
      { path: '/whreceiptBasicsManageEdit', component: () => import('@/views/whreceiptManage/financing/edit'),name:"whreceiptBasicsManageEdit"},
      { path: '/whreceiptBasicsManageCheck', component: () => import('@/views/whreceiptManage/financing/check'),name:"whreceiptBasicsManageCheck"},
      { path: '/whreceiptBasicsManageApply', component: () => import('@/views/whreceiptManage/financing/apply'),name:"whreceiptBasicsManageApply"},
  //应收
      //企业管理员
      { path: '/receiveableManageAdminList', component: () => import('@/views/receiveableManage/admin/list'),name:"receiveableManageAdminList"},
      //企业审核员
      { path: '/receiveableManageCheckList', component: () => import('@/views/receiveableManage/check/list'),name:"receiveableManageCheckList"},
      //企业录入员
      { path: '/receiveableManageUserList', component: () => import('@/views/receiveableManage/user/list'),name:"receiveableManageUserList"},
      // { path: '/receiveableManageList', component: () => import('@/views/receiveableManage/financing/list'),name:"receiveableManageList"},
      { path: '/receiveableManageAdd', component: () => import('@/views/receiveableManage/financing/add'),name:"receiveableManageAdd"},
      { path: '/receiveableManageEdit', component: () => import('@/views/receiveableManage/financing/edit'),name:"receiveableManageEdit"},
      { path: '/receiveableManageShow', component: () => import('@/views/receiveableManage/financing/show'),name:"receiveableManageShow"},
      { path: '/receiveableManageCheck', component: () => import('@/views/receiveableManage/financing/check'),name:"receiveableManageCheck"},
      { path: '/receiveableManageApply', component: () => import('@/views/receiveableManage/financing/apply'),name:"receiveableManageApply"},


      // 价值评估机构
      //仓单
       { path: '/valueAssessmentList', component: () => import('@/views/whreceiptManage/valueAssessment/list'),name:"valueAssessmentList"},
       { path: '/valueAssessmentAssess', component: () => import('@/views/whreceiptManage/valueAssessment/assess'),name:"valueAssessmentAssess"},
       { path: '/valueAssessmentShow', component: () => import('@/views/whreceiptManage/valueAssessment/show'),name:"valueAssessmentShow"},
      //应收
      // { path: '/receiveValueAssessmentList', component: () => import('@/views/receiveableManage/valueAssessment/list'),name:"receiveValueAssessmentList"},



       //风险评估机构
       //仓单
      { path: '/riskAssessmentList', component: () => import('@/views/whreceiptManage/riskAssessment/list'),name:"riskAssessmentList"},
      { path: '/riskAssessmentAssess', component: () => import('@/views/whreceiptManage/riskAssessment/assess'),name:"riskAssessmentAssess"},
      { path: '/riskAssessmentShow', component: () => import('@/views/whreceiptManage/riskAssessment/show'),name:"riskAssessmentShow"},
        //应收
      { path: '/receiveRiskAssessmentList', component: () => import('@/views/receiveableManage/riskAssessment/list'),name:"receiveRiskAssessmentList"},
      { path: '/receiveRiskAssessmentAssess', component: () => import('@/views/receiveableManage/riskAssessment/assess'),name:"receiveRiskAssessmentAssess"},
      { path: '/receiveRiskAssessmentShow', component: () => import('@/views/receiveableManage/riskAssessment/show'),name:"receiveRiskAssessmentShow"},


      //托管机构
      //仓单
      { path: '/custodianInstitutionList', component: () => import('@/views/whreceiptManage/custodianInstitution/list'),name:"custodianInstitutionList"},
      { path: '/custodianInstitutionConfirm', component: () => import('@/views/whreceiptManage/custodianInstitution/confirm'),name:"custodianInstitutionConfirm"},
      { path: '/custodianInstitutionShow', component: () => import('@/views/whreceiptManage/custodianInstitution/show'),name:"custodianInstitutionShow"},
      //应收
      { path: '/receiveCustodianInstitutionList', component: () => import('@/views/receiveableManage/custodianInstitution/list'),name:"receiveCustodianInstitutionList"},
      { path: '/receiveCustodianInstitutionConfirm', component: () => import('@/views/receiveableManage/custodianInstitution/confirm'),name:"receiveCustodianInstitutionConfirm"},
      { path: '/receiveCustodianInstitutionShow', component: () => import('@/views/receiveableManage/custodianInstitution/show'),name:"receiveCustodianInstitutionShow"},






      ]
  },


//   { path: '/main',
//     redirect:'/frontdashboard',
//     component:Home,
//     children:[
//     { path: '/frontdashboard', component: () => import('@/views/frontdashboard/index'),name:"frontdashboard"},
//     { path: '/whreceiptManage', component: () => import('@/views/whreceiptManage/list'),name:"whreceiptManageList"},

//     ]
// },


  // { path: '/page', component: () => import('@/views/page')},
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   name: 'Dashboard',
  //   hidden: true,
  //   children: [{
  //     path: 'dashboard',
  //     component: () => import('@/views/dashboard/index')
  //   }]
  // },
  // // 系统用户管理
  // {
  //   path: '/systemRoleManagement',
  //   component: Layout,
  //   redirect: '/systemRoleManagement/accountsManagement',
  //   name: 'SystemRoleManagement',
  //   meta: { title: '系统用户管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'accountsManagement',
  //       name: 'AccountsManagement',
  //       component: () => import('@/views/accountsManagement/index'),
  //       meta: { title: '账号管理', icon: 'table' }
  //     },
  //     {
  //       path: 'structureManagement',
  //       name: 'StructureManagement',
  //       component: () => import('@/views/structureManagement/index'),
  //       meta: { title: '组织架构管理', icon: 'table' }
  //     },
  //     {
  //       path: 'roleManagement',
  //       name: 'RoleManagement',
  //       component: () => import('@/views/roleManagement/list'),
  //       meta: { title: '系统角色管理', icon: 'table' }
  //     },
  //   ]
  // },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table12321', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },


  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', // 后端支持可开,
  linkActiveClass:'is_active',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
