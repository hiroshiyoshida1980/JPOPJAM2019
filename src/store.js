import Vuex from 'vuex'
import Vue from 'vue'


Vue.use(Vuex)

const state = {
    user: {},
    nowJoinSessionInfo: "-LcOuvuXyYJpe3YiQYKC",
}
const mutations = {
    onAuthStateChanged(state, user) {
        state.user = user
    },
    nowJoinSessionInfo(state, nowJoinSessionInfo) {
        state.nowJoinSessionInfo = nowJoinSessionInfo
    },
}

export default new Vuex.Store({
    state,
    mutations,
})
