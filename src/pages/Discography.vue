<template>
  <Layout>
    <h1 
      v-for="(pageData, i) in $page.allSiteData.edges" 
      :key="`${pageData}_${i}`"
      class="text-2xl text-center lg:hidden"
    >
      {{ pageData.node.pages.discography.title[lang] }}
    </h1>

    <div class="flex flex-wrap justify-center mt-2 lg:mt-12">
      <Album
        v-for="album in $page.allDiscography.edges" 
        :key="album.node.cover"
        :cover="album.node.cover"
        :title="album.node[lang].title"
        @click="() => setAlbum(album.node)"
      />
    </div>
  </Layout>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Album from '../components/Album.vue'

export default {
  metaInfo: {
    title: 'Discography'
  },
  components: {
    Album,
  },
  computed: {
    ...mapState(['lang'])
  },
  methods: {
    ...mapMutations(['setAlbum'])
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
