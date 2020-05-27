<template>
  <Layout>
    <div v-for="publication in $page.publications.edges" :key="publication.node[lang.title]">
      <h1 class="text-2xl">{{ publication.node[lang].title }}</h1>

      <a 
        v-for="article in publication.node.articles" 
        :key="article.link"
        :href="article.link"
        class="block max-w-xl mt-8 first:mt-0 group"
      >
        <p class="text-lg font-semibold group-hover:text-fluo-green">{{ article.title }}</p>
        <p class="underline">{{ article.source }}</p>
      </a>
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
