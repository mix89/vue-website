import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { requestPost } from '@/api/parent'
import {list2tree} from "@/utils/treeUtils";

const user = {
  state: {
    token: getToken(),
    companyname: '',
    account:"",
    avatar: '',
    roles: [],
    address:[],
    test:''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_COMPANYNAME: (state, companyname) => {
      // console.log(1)
      // console.log(state);
      state.companyname = companyname
    },
    SET_ACCOUNT: (state, account) => {
      // console.log(2)
      // console.log(state);
      state.account = account
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ADDRESS: (state, address) => {
      state.address = address
    },
     SET_TEST: (state, test) => {
      state.test = test
    }
  },
   getters:{
      newAddres(state){
        return state.address
      }
   },

  actions: {
    //登录

    // Login({commit},userInfo){


    //   commit.()
    // },

/*    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },*/

    // 获取用户信息
    // GetTest({commit}){
    //   return new Promise((resolve,reject)=>{
    //     console.log(context)
    //     commit.commit('SET_TEST',211313)
    //     resolve()
    //   })

    // },

    GetInfo(context) {
      return new Promise((resolve, reject) => {

        requestPost('/api/auth/site/member/show').then(response => {
      
          console.log(response)
          if(response.data.code===0){
           
            const data = response.data.res_data;
            console.log(data.userName);
            context.commit('SET_ACCOUNT',data.userName);
            context.commit('SET_COMPANYNAME',data.customerName);

            localStorage.setItem('user_front',JSON.stringify(data))
            resolve(data);
          }

          // if (data.userRoles[0].length > 0 && data.userRoles[0].roleName ) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.roleName)
          // } else {
          //   reject('getInfo: roles must be a non-null array !')
          // }
          // commit('SET_NAME', data.userName)
          // commit('SET_AVATAR', data.headPic)
          // requestPost('/api/area/get',{}).then(response2 => {
          //   if(response2.data.code === 0){
          //     localStorage.setItem('address',JSON.stringify(response2.data.res_data))
          //     commit('SET_ADDRESS', response2.data.res_data)
          //     resolve(response)
          //   }
          // })
          // requestPost('/api/auth/admin/menu/list',null).then(response => {
          //   if(response.data.code === 0){
          //     response.data.res_data.list.forEach(item => {
          //       if(item.type === 1){
          //         item.path = item.jumpUrl
          //         item.name = item.jumpUrl
          //         item.meta = {
          //           title:item.perName,
          //           icon:item.icon
          //         }
          //       }
          //     })
          //     let tree = list2tree(response.data.res_data.list,'perId','parentId');
          //     let menuJson = JSON.stringify(tree);
          //     localStorage.setItem('menuTree',menuJson)
          //   }
          // })
        }).catch(error => {
          reject(error)
        })
        /*getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })*/
      })
    },


    // 前端 登出
    // FedLogOut({ commit }) {
    //   return new Promise(resolve => {
    //     // commit('SET_TOKEN', '')
    //     removeToken()
    //     resolve()
    //   })
    // }
      // 前端 登出
    FedLogOut({ commit }) {
        return new Promise(resolve => {
          // localStorage.removeItem("address_front")
          localStorage.removeItem("menuTree_front")
          localStorage.removeItem("user_front")
          sessionStorage.removeItem("token_front")
          resolve()
        })
      }
  }
}

export default user

// import { login, logout, getInfo } from '@/api/login'
// import { getToken, setToken, removeToken } from '@/utils/auth'

// const user = {
//   state: {
//     token: getToken(),
//     name: '',
//     avatar: '',
//     roles: []
//   },

//   mutations: {
//     SET_TOKEN: (state, token) => {
//       state.token = token
//     },
//     SET_NAME: (state, name) => {
//       state.name = name
//     },
//     SET_AVATAR: (state, avatar) => {
//       state.avatar = avatar
//     },
//     SET_ROLES: (state, roles) => {
//       state.roles = roles
//     }
//   },

//   actions: {
//     // 登录
//     Login({ commit }, userInfo) {
//       const username = userInfo.username.trim()
//       return new Promise((resolve, reject) => {
//         login(username, userInfo.password).then(response => {
//           const data = response.data
//           setToken(data.token)
//           commit('SET_TOKEN', data.token)
//           resolve()
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

//     // 获取用户信息
//     GetInfo({ commit, state }) {
//       return new Promise((resolve, reject) => {
//         getInfo(state.token).then(response => {
//           const data = response.data
//           if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
//             commit('SET_ROLES', data.roles)
//           } else {
//             reject('getInfo: roles must be a non-null array !')
//           }
//           commit('SET_NAME', data.name)
//           commit('SET_AVATAR', data.avatar)
//           resolve(response)
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

//     // 登出
//     LogOut({ commit, state }) {
//       return new Promise((resolve, reject) => {
//         logout(state.token).then(() => {
//           commit('SET_TOKEN', '')
//           commit('SET_ROLES', [])
//           removeToken()
//           resolve()
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

//     // 前端 登出
//     FedLogOut({ commit }) {
//       return new Promise(resolve => {
//         commit('SET_TOKEN', '')
//         removeToken()
//         resolve()
//       })
//     }
//   }
// }

// export default user
