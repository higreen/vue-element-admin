import public_routes from '@/router/public'
import private_routes from '@/router/private'

// 权限名称集合
let privilege_names = []

// 过滤路由
function filterRoutes(routes) {
  const list = []

  routes.forEach((item) => {
    const route = { ...item }
    if (hasPrivilege(route.name)) {
      if (route.children) {
        route.children = filterRoutes(route.children)
      }

      list.push(route)
    }
  })

  return list
}

// 检查权限
function hasPrivilege(route_name) {
  return route_name ? privilege_names.includes(route_name) : true
}

export default {
  namespaced: true,
  state: {
    routes: [],
    original_routes: JSON.parse(JSON.stringify(private_routes)),
  },
  mutations: {
    CLEAR(state) {
      state.routes = []
    },
    setRoutes(state, routes) {
      state.routes = [...public_routes, ...routes]
    },
  },
  actions: {
    // 生成路由
    generateRoutes({ commit }, privileges) {
      return new Promise(resolve => {
        const routes = [...private_routes]
        let _routes = []

        // 降级路由,三级转二级
        routes.forEach((i) => {
          if (i.children) {
            i.children.forEach((j) => {
              if (j.children) {
                j.children.forEach((k) => {
                  i.children.push(k)
                })
                delete j.children
              }
            })
          }
        })

        // 是否超级管理员
        if (privileges === 'all') {
          _routes = [...routes]
        } else if (Array.isArray(privileges)) {
          privilege_names = []
          privileges.forEach((item) => privilege_names.push(item))
          _routes = filterRoutes(routes)
        }

        _routes.push({ path: '*', redirect: '/404', hidden: true })
        commit('setRoutes', _routes)
        resolve(_routes)
      })
    },
    clear({ commit }) {
      commit('CLEAR')
    },
  },
}
