import Vuex from 'vuex'
import Vue from 'vue'


Vue.use(Vuex)

const state = {
    user: {},
    nowJoinSessionInfo: "-LjIy_2R5FiKoT8F0VDd",
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
