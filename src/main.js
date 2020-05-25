// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import Vuex from 'vuex';
import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/styles/output.css'

export default function (Vue, { router, head, isClient, appOptions }) {
  Vue.use(Vuex)

  appOptions.store = new Vuex.Store({
    state: {
      lang: 'rs',
      mobileMenuHidden: true
    },
    mutations: {
      setLanguage (state, lang) {
        state.lang = lang
      },
      toggleMobileMenu(state) {
        state.mobileMenuHidden = !state.mobileMenuHidden
      }
    }
  })

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}