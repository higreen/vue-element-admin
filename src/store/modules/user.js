import ajax from '@/assets/ajax'
import { removeAuth } from '@/assets/auth'
import { resetRouter } from '@/router'

const state = {
  avatar: '',
  permissions: '',
}

const mutations = {
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
}

const actions = {
  // 查询用户信息
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      ajax.get('/admin/user')
        .then(res => {
          commit('SET_AVATAR', res.avatar)
          commit('SET_PERMISSIONS', res.permissions)
          if (res.is_default_password) {
            commit('promptChangePassword')
          }

          resolve(res)
        }).catch(error => {
          removeAuth()
          reject(error)
        })
    })
  },
  setAvatar({ commit }, avatar) {
    commit('SET_AVATAR', avatar)
  },
  // 退出登录
  signOut({ commit, dispatch }) {
    commit('SET_AVATAR', '')
    commit('SET_PERMISSIONS', '')
    dispatch('tagsView/delAllViews', null, { root: true })
    dispatch('permission/clear', null, { root: true })
    removeAuth()
    resetRouter()
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
