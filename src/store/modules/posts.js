
import { request } from 'graphql-request'

import { endpoint, allPostsQuery } from '@/lib/config.posts'

const state = {
  all: []
}

const mutations = {
  ADD_POST (state, post) {
    state.all.push(post)
  }
}

const actions = {
  populate ({ state, commit }) {
    if (state.all.length > 0) {
      return;
    }

    request(endpoint, allPostsQuery)
      .then(data => data.posts.forEach(post => commit('ADD_POST', post)))
  }
}

export default { namespaced: true, state, mutations, actions }
