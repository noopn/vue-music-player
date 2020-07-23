import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutation'
import * as state from './state'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const strict = process.env.NODE_ENV === 'development'
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict,
  plugins: strict ? [createLogger()] : []
})
