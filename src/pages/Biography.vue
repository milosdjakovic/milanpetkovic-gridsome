<template>
  <Layout>
    <div v-for="biography in $page.biography.edges" :key="biography.node[lang].title">
      <h1>{{ biography.node[lang].title }}</h1>

      <div>
        <g-image
          src="~/assets/images/milan_profile.jpg"
          alt="Milan Petkovic performing"
          class="float-none mb-0 ml-0 md:float-right md:ml-8 md:mb-8"
          width="400"
        />

        <p
          v-for="(paragraph, i) in biography.node[lang].content"
          :key="`bio_para_${i}`"
        >{{paragraph}}</p>

        <a
          href="https://sr.wikipedia.org/wiki/Milan_Petković"
          class="underline text-fluo-green"
        >Wikipedia</a>
      </div>
    </div>
  </Layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  metaInfo: {
    title: "Discography"
  },
  computed: {
    ...mapState(["lang"])
  }
};
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
