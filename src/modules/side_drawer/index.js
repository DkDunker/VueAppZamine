const state = {
    // esto cambia el cajón lateral
    sideDrawer: false,
    gesturesEnabled:true,
}

const mutations = {
    // siempre y solo cambia el estado de vuex a través de mutaciones.
    setSideDrawer(state, data) {
        state.sideDrawer = data
    },
    setGesturesEnabled(state, data) {
        state.gesturesEnabled = data
    }
}

const getters = {
    // el getter 'sideDrawer' estará disponible para escuchar en la interfaz.
    // este es el cambio que estamos viendo en /app/mixins/sideDrawer.js
    sideDrawer: (state)         => state.sideDrawer,
    gesturesEnabled: (state)    => state.gesturesEnabled
}

// export this module.
export default {
    namespaced: true,
    state,
    mutations,
    getters
}