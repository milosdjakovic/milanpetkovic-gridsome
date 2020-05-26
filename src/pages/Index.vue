<template>
  <Layout >
    <div v-for="({ node }, i) in $page.allSiteData.edges" :key="`home_data_${i}`">
      <!-- Latest release -->
      <div>
        <h2>{{ node.pages.home.release.subtitle[lang] }}</h2>
        <Album
          v-for="(album, i) in $page.allDiscography.edges" 
          :key="`home_latest_release_${i}`"
          :cover="album.node.cover"
          :title="album.node[lang].title"
        />

        <g-link to="/discography">{{ node.pages.home.release.text[lang] }}</g-link>
      </div>

      <!-- Upcoming events -->
      <div>
        <h2>{{ node.pages.home.event.subtitle[lang] }}</h2>
        <h2>{{ node.pages.home.event.noEvent[lang] }}</h2>
  
        <g-link to="/events">{{ node.pages.home.event.text[lang] }}</g-link>
      </div>

      <!-- Featured video -->
      <div>
        <h2>{{ node.pages.home.video.subtitle[lang] }}</h2>
  
        <div
          class="relative mt-2"
          style="width: 100%; height: 0; padding-bottom: 56.25%;"
          v-for="(video, i) in $page.allVideos.edges"
          :key="`home_video_${i}`"
        >
          <p>
            {{ video.node.title[lang] }}
          </p>
          
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
        
        <g-link to="/media">{{ node.pages.home.video.text[lang] }}</g-link>
      </div>

      <div v-for="(publication, i) in $page.allPublications.edges" :key="`home_article_${i}`">
        <h2>{{ publication.node[lang].titleLatest }}</h2>

        <a :href="publication.node.articles[0].link">
          <p>{{ publication.node.articles[0].title }}</p>
          <p>{{ publication.node.articles[0].source }}</p>
        </a>
      </div>
    </div>

    <!-- Latest publication -->
    <!-- <g-image alt="Example image" src="~/favicon.png" width="135" /> -->
  </Layout>
</template>

<script>
import { mapState } from 'vuex';
import Album from '../components/Album.vue'

export default {
  metaInfo: {
    title: 'Home'
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
	allPublications {
    edges {
      node {
        rs {
          titleLatest
        }
        en {
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
