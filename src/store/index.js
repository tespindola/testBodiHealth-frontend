import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state () {
        return {
            login: false,
            nameUser: null
        }
    },
    mutations: {
        setLogin (state, nameUser) {
            state.login = true;
            state.nameUser = nameUser;
        },
        outLogin(state){
            state.login = false;
            state.nameUser = null;
        }
    }
})

export default store;