
const state = {
  storageRef: null,
  storageLimit: 0,
  images: []
}

const mutations = {
  SETUP (state, ref) {
    state.storageRef = ref
  },
  ADD_IMAGE (state, image) {
    state.images.push(image)
  },
  SET_STORAGE_LIMIT (state, subscription) {
    let defaultLimit = 10 * 1000 * 1000 // 10 MB

    switch (subscription) {
      // TODO: update when renaming subscription tiers
      case 'premium':
        state.storageLimit = defaultLimit * 10 // 100 MB
        break;
    
      default:
        state.storageLimit = defaultLimit // 10 MB
        break;
    }
  }
}

const actions = {
  connect ({ rootState, commit }, uid) {
    commit('SETUP', rootState.storage.ref().child(uid))
  },
  disconnect ({ commit }) {
    // TODO
  },
  setStorageLimit ({ commit }, subscription) {
    commit('SET_STORAGE_LIMIT', subscription)
  },
  setupImages ({ dispatch }, images) {
    for (var i = 0, j = images.length; i < j; i++) {
      dispatch('addImage', images[i])
    }
  },
  addImage ({ state, commit }, url) {
    let fileName = url.substring(url.lastIndexOf('%2F') + 3, url.lastIndexOf('?'))
    let fileRef = state.storageRef.child(fileName)

    fileRef.getMetadata()
      .then(metadata => {
        commit('ADD_IMAGE', {
          url,
          name: metadata.name,
          size: metadata.size,
          created: metadata.timeCreated,
          type: metadata.contentType
        })
      })
  }
}

export default { namespaced: true, state, mutations, actions }
