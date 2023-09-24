import { customService } from '@/services/custom.service';
import { createStore } from 'vuex';

export default createStore({

state: {

    publicStyle: {
        backgroundColor : "#FFFFFF",
        homeColor: "#FFFFFF",
        moduleColor: "#FFFFFF",
        buttonColor: "#FFFFFF",
        titleColor : "#FFFFFF",
        textColor : "#FFFFFF"

    }
},
getters: {
    publicStyle: state => state.publicStyle
},
mutations: {
    SET_PUBLIC_STYLE(state, publicStyle) {
        state.publicStyle = publicStyle;
        document.documentElement.style.setProperty('--backgroundColor', publicStyle.backgroundColor);
        document.documentElement.style.setProperty('--homeColor', publicStyle.homeColor);
        document.documentElement.style.setProperty('--moduleColor', publicStyle.moduleColor);
        document.documentElement.style.setProperty('--buttonColor', publicStyle.buttonColor);
        document.documentElement.style.setProperty('--titleColor', publicStyle.titleColor);
        document.documentElement.style.setProperty('--textColor', publicStyle.textColor);
    },
},
actions: {
    getPublicStyle({ commit }) {
        return customService.getPublicStyle()
            .then(res => {
                commit('SET_PUBLIC_STYLE', res.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération du style", error);
            });
    },
    updatePublicStyle({ commit }, updatedStyle) {
        return customService.updatePublicStyle(updatedStyle)
            .then(() => {
                commit('SET_PUBLIC_STYLE', updatedStyle);
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour du style.", error);
            });
    },

    resetPublicStyle({ commit }) {
        // Appelez votre service pour récupérer les valeurs de style initiales depuis la base de données
        return customService.getInitialPublicStyle()
            .then(res => {
                commit('SET_PUBLIC_STYLE', res.data);
            })
            .catch(error => {
                console.error("Erreur lors de la réinitialisation du style", error);
            });
    },



    initializeData({ dispatch }) {
        return dispatch('getPublicStyle');
    },
},

modules: {

}
})


