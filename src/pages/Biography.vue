<template>
  <Layout>
    <div v-for="biography in $page.biography.edges" :key="biography.node[lang].title">
      <h1>{{ biography.node[lang].title }}</h1>

      <div>
        <g-image src="~/assets/images/milan_profile.jpg" alt="milan petkovic performing" />

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
  biography: allBiography {
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
