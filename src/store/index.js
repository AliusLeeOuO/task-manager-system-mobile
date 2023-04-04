import Vue from "vue";
import Vuex from "vuex";
import createPersistedstate from "vuex-persistedstate"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    
  },
  mutations: {},
  getters: {
    logOut() {
      return function() {
        Cookies.remove("position");
        Cookies.remove("rofessional");
        Cookies.remove("token");
        Cookies.remove("parentId");
        this.$router.push("/login");
      }
    },
  },
  actions: {},
  modules: {},
  plugins: [ createPersistedstate()]

});
