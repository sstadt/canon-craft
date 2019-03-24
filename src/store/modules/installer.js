
import { isIos, isInStandaloneMode } from '@/lib/util'

const INSTALLER_DISMISSED_KEY = 'cc_pwa_installer_dismissed'

const state = {
  showInstaller: false
}

const mutations = {
  SHOW_INSTALLER (state) {
    state.showInstaller = true
  },
  HIDE_INSTALLER (state) {
    state.showInstaller = false
  }
}

const actions = {
  init ({ commit }) {
    if (isIos() && !isInStandaloneMode() && localStorage[INSTALLER_DISMISSED_KEY] !== 'true') {
      commit('SHOW_INSTALLER')
      setTimeout(() => commit('HIDE_INSTALLER'), 30000)
    }
  },
  dismiss ({ commit }) {
    localStorage[INSTALLER_DISMISSED_KEY] = 'true'
    commit('HIDE_INSTALLER')
  }
}

export default { namespaced: true, state, mutations, actions }
