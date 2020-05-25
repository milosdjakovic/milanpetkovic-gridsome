<template>
  <Layout>
    <div v-for="publication in $page.publications.edges" :key="publication.node[lang.title]">
      <h1>{{ publication.node[lang].title }}</h1>

      <div v-for="article in publication.node.articles" :key="article.link">
        <p>{{ article.title }}</p>
        <p>{{ article.source }}</p>
        <p>{{ article.link }}</p>
      </div>
    </div>
  </Layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  metaInfo: {
    title: 'Publications'
  },
  computed: {
    ...mapState(['lang'])
  }
}
</script>

<page-query>
query {
  publications: allPublications {
    edges {
      node {
        rs {
          title
          titleLatest
        }
        en {
          title
          titleLatest
        }
        articles {
          title
          source
          link
        }
      }
    }
  }
}
</page-query>
