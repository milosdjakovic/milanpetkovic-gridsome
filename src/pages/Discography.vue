<template>
  <Layout>
    <h1 v-for="(pageData, i) in $page.allSiteData.edges" :key="`${pageData}_${i}`">
      {{ pageData.node.pages.discography.title[lang] }}
    </h1>

    <Album
      v-for="album in $page.allDiscography.edges" 
      :key="album.node.cover"
      :cover="album.node.cover"
      :title="album.node[lang].title"
    />

    <!-- <div v-for="album in $page.allDiscography.edges" :key="album.node.cover">
      <p>{{ album.node[lang].title }}</p>
      <p>{{ album.node[lang].year }}</p>
      <div>
        <p v-for="song in album.node[lang].songs" :key="song">
          {{ song }}
        </p>
      </div>
    </div> -->
  </Layout>
</template>

<script>
import { mapState } from 'vuex';
import Album from '../components/Album.vue'

export default {
  metaInfo: {
    title: 'Discography'
  },
  components: {
    Album
  },
  computed: {
    ...mapState(['lang'])
  }
}
</script>

<page-query>
query {
  allDiscography(order: ASC) {
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
  allSiteData {
    edges {
      node {
        pages {
          discography {
            title {
              en
              rs
            }
          }
        }
      }
    }
  }
}
</page-query>
