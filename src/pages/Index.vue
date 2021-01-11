<template>
  <Layout>
    <div v-for="({ node }, i) in $page.allSiteData.edges" :key="`home_data_${i}`">
      <!-- Latest release -->
      <div class="text-center">
        <h2 class="text-2xl text-center">{{ node.pages.home.release.subtitle[lang] }}</h2>
        
        <div class="flex flex-wrap justify-center mt-2">
          <Album
            v-for="(album, i) in $page.allDiscography.edges"
            :key="`home_latest_release_${i}`"
            :cover="album.node.cover"
            :title="album.node[lang].title"
            @click="() => setAlbum(album.node)"
          />
        </div>
        <g-link 
          to="/discography"
          class="link"
        >
          {{ node.pages.home.release.text[lang] }}
        </g-link>
      </div>

      <!-- Upcoming events -->
      <div class="mt-16 text-center">
        <div v-if="upcomingEvents.length > 0">
          <h2 class="text-2xl">{{ node.pages.home.event.subtitle[lang] }}</h2>

          <a 
            v-for="event in upcomingEvents" 
            :key="`${ event.date }_${ event.time }`"
            :href="event.link"
            class="block pb-3 mt-4 transition-colors duration-300 ease-in-out cursor-pointer group"
          >
            <p class="text-xl group-hover:text-fluo-green">{{ event.place }}</p>
            <p class="text-sm font-bold text-gray-400 group-hover:text-fluo-green">{{ event.town }}</p>
            <p class="font-bold text-fluo-green group-hover:text-gray-400">{{ new Date(`${event.date}T${event.time}Z`).toLocaleDateString(localeLang, dateOptions) }}</p>
          </a>
        </div>

        <div v-else>
          <h2 class="text-2xl">{{ node.pages.home.event.noEvent[lang] }}</h2>
        </div>

        <g-link 
          to="/events"
          class="inline-block mt-6 link" 
          >
            {{ node.pages.home.event.text[lang] }}
          </g-link>
      </div>

      <!-- Featured video -->
      <div class="mt-16 text-center">
        <h2 class="text-2xl">{{ node.pages.home.video.subtitle[lang] }}</h2>

        <div
          class="relative mt-6"
          style="width: 100%; height: 0; padding-bottom: 56.25%;"
          v-for="(video, i) in $page.allVideos.edges"
          :key="`home_video_${i}`"
        >
          <p>{{ video.node.title[lang] }}</p>

          <iframe
            :title="video.node.title[lang]"
            width="560"
            height="315"
            class="absolute top-0 left-0 w-full h-full"
            :src="video.node.link"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope;
            picture-in-picture"
            allowfullscreen
          />
        </div>

        <g-link 
          to="/media"
          class="inline-block mt-6 link"
        >
          {{ node.pages.home.video.text[lang] }}
        </g-link>
      </div>

      <!-- Latest publication -->
      <div
        v-for="(publication, i) in $page.allPublications.edges"
        :key="`home_article_${i}`"
        class="mt-16 text-center"
      >
        <h2 class="text-2xl">{{ publication.node[lang].titleLatest }}</h2>

        <a 
          :href="publication.node.articles[0].link"
          class="inline-block max-w-xl mt-6 group"
        >
          <p class="text-lg font-semibold group-hover:text-fluo-green">{{ publication.node.articles[0].title }}</p>
          <p class="underline">{{ publication.node.articles[0].source }}</p>
        </a>

        <g-link 
          to="/publications"
          class="block mt-6 link"
        >
          {{ publication.node[lang].all }}
        </g-link>
      </div>
    </div>
  </Layout>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Album from "../components/Album.vue";

export default {
  metaInfo: {
    title: "Home"
  },
  components: {
    Album
  },
  data: () => ({
    upcomingEvents: [],
    dateOptions: {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }
  }),
  computed: {
    ...mapState(["lang"]),
    localeLang() {
      if (this.lang === "rs") {
        return "sr-Latn";
      }

      return "en";
    }
  },
  methods: {
    ...mapMutations(["setAlbum"])
  },
  created() {
    this.$page.allEvents.edges.forEach(event => {
      if (new Date(`${event.node.date}T${event.node.time}Z`) > Date.now()) {
        this.upcomingEvents.push(event.node);
      }
    });
  }
};
</script>

<page-query>
query {
	allSiteData {
    edges {
      node {
        pages {
           home {
						release {
              subtitle {
                en
                rs
              }
              text {
                rs
                en
              }
            }
            event {
              subtitle {
                rs
                en
              }
              noEvent {
                rs
                en
              }
              text {
                rs
                en
              }
            }
            video {
              subtitle {
                rs
                en
              }
              text {
                rs
                en
              }
            }
          }
        }
      }
    }
  }
  allDiscography(filter: {latest: {eq: true}}, order: ASC) {
  	edges {
      node {
        latest
        cover
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
  allVideos(limit: 1, order: ASC) {
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
  allEvents {
    edges {
      node {
        date
        time
        place
        town
        link
      }
    }
  }
	allPublications {
    edges {
      node {
        rs {
          titleLatest
          all
        }
        en {
          titleLatest
          all
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
