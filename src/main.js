// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import Vuex from 'vuex';
import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/styles/output.css'
import '~/assets/styles/custom-properties.css'

export default function (Vue, { router, head, isClient, appOptions }) {
  Vue.use(Vuex)

  appOptions.store = new Vuex.Store({
    state: {
      lang: 'en',
      mobileMenuHidden: true,
      selectedAlbum: null
    },
    mutations: {
      setLanguage (state, lang) {
        state.lang = lang
      },
      toggleMobileMenu(state) {
        state.mobileMenuHidden = !state.mobileMenuHidden
      },
      setAlbum(state, album) {
        state.selectedAlbum = album
      }
    }
  })
  
  head.meta.push({
    property: 'og:title',
    content: 'Milan Petković'
  })

  head.meta.push({
    property: 'og:image',
    content: 'http://milanpetkovic.com/images/bird-banner.jpg'
  })
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}