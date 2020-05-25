<template>
  <Layout>
    <h1>Discography</h1>

    <div v-for="album in $page.allDiscography.edges" :key="album.node.cover">
      <p>{{ album.node[lang].title }}</p>
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
    ...mapState(['lang'])
  }
}
</script>

<page-query>
query {
  allDiscography {
    edges {
      node {
        cover
        latest
        rs {
          title
          year
          songs
        }
        en {
          title
          year
          songs
        }
      }
    }
  }
}
</page-query>
