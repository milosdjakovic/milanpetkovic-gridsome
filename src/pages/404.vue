<template>
  <div
    class="flex flex-col items-center h-screen text-gray-100"
    style="background-image: url(/images/dark_leather.png);"
  >
    <div class="flex justify-end w-full h-16 max-w-6xl px-6 text-sm">
      <button
        class="px-3 focus:outline-none"
        :class="lang === 'en' && 'text-fluo-green'"
        @click="() => setLanguage('en')"
      >EN</button>
      <span class="self-center">/</span>
      <button
        class="px-3 focus:outline-none"
        :class="lang === 'rs' && 'text-fluo-green'"
        @click="() => setLanguage('rs')"
      >RS</button>
    </div>

    <div
      v-for="(data, i) in $page.allPage404.edges"
      :key="`404_page_data${i}`"
      class="flex flex-col items-start w-full max-w-6xl px-8"
    >
      <h1 class="text-2xl">{{ data.node.title[lang] }}</h1>
      <g-link 
        to="/"
        class="inline-block mt-6 underline opacity-75 text-fluo-green hover:opacity-100"
      >
        {{ $page.siteData.navigation.links[lang][0] }}
      </g-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  metaInfo: {
    title: "404"
  },
  computed: {
    ...mapState(["lang"])
  },
  methods: {
    ...mapMutations(["setLanguage"])
  }
};
</script>

<style>
</style>

<page-query>
query {
  allPage404 {
    edges {
      node {
        title {
          rs
          en
        }
      }
    }
  }
  siteData(id: "66f774bd") {
    navigation {
      links {
        rs
        en
      }
      routes
    }
  }
}
</page-query>