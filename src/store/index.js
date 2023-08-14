import { createStore } from 'vuex'

export default createStore({
//   state: {
//     token: null
//   },
//   getters: {
//     getToken: state => state.token
//   },
//   mutations: {
//     setToken: (state, token) => {
//       state.token = token
//     }
//   },
//   actions: {
//     setToken: ({ commit }, token) => {
//       commit('setToken', token)
//     }
//   },
//   modules: {
//   }
// })

state: {

    publicStyle: {
        bgColor: "#f5ebdc", 
        color: "#ffff"
    }
},
getters: {
    getPublicStyle: (state) => (e) => {
        return state.publicStyle[e];
    }
    
},
mutations: {
    changePublicStyle(state, payload){
        state.publicStyle.color = payload
    }

},
actions: {
  
},
modules: {

}
})
