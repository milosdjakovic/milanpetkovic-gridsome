<template>
  <nav 
    :class="!mobileMenuHidden ? 'flex' : 'hidden'"
    class="fixed inset-0 z-30 items-center justify-center overflow-y-auto lg:hidden"
    style="background-image: url(/images/dark_leather.png);"
  >
    <div 
      v-for="(data, i) in $static.allSiteData.edges" 
      :key="`mobile_nav_query_${i}`" 
      class="flex flex-col items-center max-w-lg"
      @click="toggleMobileMenu"
    >
      <g-link
        v-for="(route, i) in data.node.navigation.routes"
        :key="`mobile_route_${route}`"
        :to="`/${route}`"
        class="flex items-center h-16 px-6 text-gray-500 border-2 border-transparent rounded-md hover:text-gray-100"
        active-class="text-fluo-green border-fluo-green"
        exact
      >
        <span>{{ data.node.navigation.links[lang][i] }}</span>
      </g-link>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(['lang', 'mobileMenuHidden'])
  },
  methods: {
    ...mapMutations(['toggleMobileMenu']),
  }
}
</script>

<static-query>
query {
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