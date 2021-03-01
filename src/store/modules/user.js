import ajax from '@/assets/ajax'
import { removeAuth } from '@/assets/auth'
import { resetRouter } from '@/router'

const state = {
  avatar: '',
  privileges: '',
}

const mutations = {
  setAvatar: (state, avatar) => {
    state.avatar = avatar
  },
  setPrivilege: (state, privileges) => {
    state.privileges = privileges
  },
}

const actions = {
  // 查询用户信息
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      ajax.get('/admin/user')
        .then(res => {
          commit('setAvatar', res.avatar)
          commit('setPrivilege', res.privileges)

          resolve(res.privileges)
        }).catch(error => {
          removeAuth()
          reject(error)
        })
    })
  },
  setAvatar({ commit }, avatar) {
    commit('setAvatar', avatar)
  },
  // 退出登录
  signOut({ commit, dispatch }) {
    commit('setAvatar', '')
    commit('setPrivilege', '')
    dispatch('tagsView/delAllViews', null, { root: true })
    dispatch('privilege/clear', null, { root: true })
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
