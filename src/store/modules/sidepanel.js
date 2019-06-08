
import { clone } from '@/lib/util.js'

const openSidepanelEvent = new Event('sidepanel-open')
const closeSidepanelEvent = new Event('sidepanel-close')

const state = {
  show: false,
  type: '',
  data: {}
}

const mutations = {
  SET_CONTENT (state, { type, data }) {
    state.type = type
    state.data = clone(data)
  },
  OPEN (state) {
    state.show = true
    document.dispatchEvent(openSidepanelEvent)
  },
  CLOSE (state) {
    state.show = false
    document.dispatchEvent(closeSidepanelEvent)
  }
}

const actions = {
  close ({ commit }) {
    commit('CLOSE')
  },
  showContent ({ state, commit }, { type, data }) {
    commit('SET_CONTENT', { type, data })
    if (!state.show) commit('OPEN')
  }
}

export default { namespaced: true, state, mutations, actions }
