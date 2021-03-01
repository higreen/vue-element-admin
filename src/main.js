import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './guard' // permission control

Vue.use(Element, {
  size: 'medium', // set element-ui default size
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
