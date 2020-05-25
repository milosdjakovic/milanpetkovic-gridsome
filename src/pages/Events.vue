<template>
  <Layout>
    <h1 v-for="(pageData, i) in $page.allSiteData.edges" :key="`${pageData}_${i}`">
      {{ pageData.node.pages.events.title[lang] }}
    </h1>

    <div v-for="event in $page.allEvents.edges" :key="`${event.node.date}_ ${event.node.time}`">
      <p>{{ event.node.place }}</p>
      <p>{{ event.node.date }}</p>
      <p>{{ event.node.time }}</p>
      <p>{{ event.node.town }}</p>
      <p>{{ event.node.link }}</p>
    </div>
  </Layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  metaInfo: {
    title: 'Events'
  },
  computed: {
    ...mapState(['lang'])
  }
}
</script>

<style>

</style>

<page-query>
query {
  allEvents {
    edges {
      node {
        date
        time
        place
        town
        link
      }
    }
  }
  allSiteData {
    edges {
      node {
        pages {
          events {
            title {
              rs
              en
            }
          }
        }
      }
    }
  }
}
</page-query>