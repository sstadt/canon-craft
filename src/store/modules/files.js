
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
