<template>
  <div
    class="text-gray-100"
    style="background-image: url(/images/dark_leather.png);"
  >
    <header>
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav
        v-for="(data, i) in $static.allSiteData.edges"
        :key="`nav_query_${i}`"
      >
        <g-link
          v-for="(route, i) in data.node.navigation.routes"
          :key="`route_${route}`"
          :to="`/${route}`"
        >
          {{ data.node.navigation.links[lang][i] }}
        </g-link>
      </nav>
      <div>
        <button @click="() => setLanguage('en')">EN</button>
        <span>/</span>
        <button @click="() => setLanguage('rs')">RS</button>
      </div>
    </header>
    <slot />
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
    ...mapState(["lang"]),
  },
  methods: {
    ...mapMutations(["setLanguage"]),
  },
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
