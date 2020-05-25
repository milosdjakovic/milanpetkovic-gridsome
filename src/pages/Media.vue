<template>
  <Layout>
    <div v-for="video in $page.allVideos.edges" :key="video.node.title[lang]">
      <h1>{{ video.node.title[lang] }}</h1>

      <p>{{video.node.link}}</p>
    </div>
  </Layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  metaInfo: {
    title: 'Discography'
  },
  computed: {
    ...mapState(['lang']),
  }
}
</script>

<page-query>
query {
  allVideos {
    edges {
      node {
        title {
          rs
          en
        }
        link
      }
    }
  }
}
</page-query>
