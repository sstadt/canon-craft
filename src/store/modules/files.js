
const state = {
  storageRef: null,
  storageLimit: 0,
  images: []
}

const mutations = {
  SETUP (state, ref) {
    state.storageRef = ref
  },
  RESET_STORAGE (state) {
    state.storageRef = null
    state.images = []
  },
  SET_STORAGE_LIMIT (state, subscription) {
    let defaultLimit = 10 * 1000 * 1000 // 10 MB

    switch (subscription) {
      // TODO: update when renaming subscription tiers
      //   > create a config file exporting constants that
      //     determines the subscription naming
      case 'premium':
        state.storageLimit = defaultLimit * 10 // 100 MB
        break;
    
      default:
        state.storageLimit = defaultLimit // 10 MB
        break;
    }
  },
  ADD_IMAGE (state, image) {
    state.images.push(image)
  },
  REMOVE_IMAGE (state, url) {
    let index = state.images.findIndex(image => image.url === url)
    if (index > -1) state.images.splice(index, 1)
  }
}

const actions = {
  connect ({ rootState, commit }, uid) {
    commit('SETUP', rootState.storage.ref().child(uid))
  },
  disconnect ({ commit }) {
    commit('RESET_STORAGE')
    commit('SET_STORAGE_LIMIT', null)
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
  },
  deleteImage ({ state, dispatch, commit }, file) {
    let fileRef = state.storageRef.child(file.name)

    fileRef.delete()
      .then(() => {
        commit('REMOVE_IMAGE', file.url)
        dispatch('user/removeImage', file.url, { root: true })
      })
  }
}

export default { namespaced: true, state, mutations, actions }
