<template>
  <div class="text-gray-100" style="background-image: url(/images/dark_leather.png);">
    <div
      :class="notOnTop"
      class="fixed inset-x-0 z-30 flex justify-center h-12 border-b-2 border-transparent md:h-16"
      style="background-image: url(/images/dark_leather.png);"
    >
      <header class="flex justify-between w-full max-w-6xl px-6">
        <strong class="flex items-center">
          <g-link to="/">{{ $static.metadata.siteName }}</g-link>
        </strong>

        <nav 
          v-for="(data, i) in $static.allSiteData.edges" 
          :key="`nav_query_${i}`" 
          class="hidden lg:flex"
        >
          <g-link
            v-for="(route, i) in data.node.navigation.routes"
            :key="`route_${route}`"
            :to="`/${route}`"
            class="flex items-center px-4 text-gray-500 hover:text-gray-100"
            active-class="text-fluo-green shadow-bottom-fluo"
            exact
          >
            <span>{{ data.node.navigation.links[lang][i] }}</span>
          </g-link>
        </nav>

        <div class="flex text-sm">
          <button
            class="px-2 focus:outline-none"
            :class="lang === 'en' && 'text-fluo-green'"
            @click="() => setLanguage('en')"
          >EN</button>
          <span class="self-center">/</span>
          <button
            class="px-2 focus:outline-none"
            :class="lang === 'rs' && 'text-fluo-green'"
            @click="() => setLanguage('rs')"
          >RS</button>

          <button 
            class="flex justify-center w-10 focus:outline-none hover:text-fluo-green"
            @click="toggleMobileMenu"
          >
            <svg
              v-if="mobileMenuHidden"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 icon icon-tabler icon-tabler-menu"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 icon icon-tabler icon-tabler-x"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </header>
    </div>

    <main class="pt-12 md:pt-16">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Footer from "../components/Footer.vue";

export default {
  components: {
    Footer
  },
  computed: {
    ...mapState(['lang', 'mobileMenuHidden'])
  },
  data: () => ({
    notOnTop: ''
  }),
  methods: {
    ...mapMutations(['setLanguage', 'toggleMobileMenu']),
    handleScroll() {
      if(window.scrollY > 0) {
        this.notOnTop = 'border-gray-800 shadow-xl'
      } else {
        this.notOnTop = 'border-transparent'
      }
    }
  },
  mounted: function () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed: function () {
    window.removeEventListener('scroll', this.handleScroll);
  }
  // mounted() {
  //     window.document.body.onscroll = function() {
  //     console.log(window.document.body.scrollTop);
  //     console.log(window.document.body.clientHeight);
  // }
  // }
};
</script>

<static-query>
query {
  metadata {
    siteName
  }
  allSiteData {
    edges {
      node {
        navigation {
          links {
            rs
            en
          }
          routes
        }
      }
    }
  }
}
</static-query>
