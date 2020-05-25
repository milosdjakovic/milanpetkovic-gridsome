<template>
  <div class="layout">
    <header class="header">
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav class="nav" v-for="(data, i) in $static.allSiteData.edges" :key="`nav_query_${i}`">
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
    <slot/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {

  computed: {
    ...mapState(['lang']),
  },
  methods: {
    ...mapMutations(['setLanguage'])
  }
}
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

<style>
body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
}

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
}
</style>
