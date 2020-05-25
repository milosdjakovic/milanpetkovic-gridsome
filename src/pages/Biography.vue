<template>
  <Layout>
    <div v-for="biography in $page.allBiography.edges" :key="biography.node[lang].title">
      <h1>{{ biography.node[lang].title }}</h1>

      <div>
        <p v-for="(paragraph, i) in biography.node[lang].content" :key="`bio_para_${i}`">
          {{paragraph}}
        </p>
      </div>
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
  allBiography {
    edges {
      node {
        rs {
          title
          content
        }
        en {
          title
          content
        }
      }
    }
  }
}
</page-query>
