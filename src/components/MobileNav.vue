<template>
  <transition name="fade-mobile-nav">
    <nav
      v-show="!mobileMenuHidden"
      class="fixed inset-0 z-30 flex items-center justify-center overflow-y-auto lg:hidden"
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
  </transition>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["lang", "mobileMenuHidden"])
  },
  methods: {
    ...mapMutations(["toggleMobileMenu"])
  }
};
</script>

<style scoped>
.fade-mobile-nav-enter-active,
.fade-mobile-nav-leave-active {
  transition: opacity 0.5s, transform 0.5s;
  transform-origin: top;
}
.fade-mobile-nav-enter,
.fade-mobile-nav-leave-to {
  opacity: 0;
  transform: rotateX(20deg) translateY(-20px);
}
</style>

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