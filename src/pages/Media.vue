<template>
  <Layout>
    <div v-for="(video, i) in $page.lastVideo.edges" :key="`media_video_${i}`">
      <p v-if="currentVideo.title">{{ currentVideo.title[lang] }}</p>
      <p v-else>{{ video.node.title[lang] }}</p>

      <div
        class="relative mt-2"
        style="width: 100%; height: 0; padding-bottom: 56.25%;"
      >
        <iframe
          title="test"
          width="560"
          height="315"
          class="absolute top-0 left-0 w-full h-full"
          :src="currentVideo.link || video.node.link"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope;
          picture-in-picture"
          allowfullscreen 
        />
      </div>
    </div>

    <button 
      v-for="(video, i) in $page.allVideos.edges"
      :key="`media_video_button_${i}`"
      @click="currentVideo = {title: video.node.title, link: video.node.link}"
    >
      {{ video.node.title[lang] }}
    </button>
    <!-- <div
      class="relative mt-2"
      style="width: 100%; height: 0; padding-bottom: 56.25%;"
      v-for="(video, i) in $page.allVideos.edges"
      :key="`media_video_${i}`"
    >
      <p>
        {{ video }}
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
    </div> -->

    <!-- <div v-for="video in $page.allVideos.edges" :key="video.node.title[lang]">
      <h1>{{ video.node.title[lang] }}</h1>

      <p>{{video.node.link}}</p>
    </div> -->
  </Layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  metaInfo: {
    title: 'Discography'
  },
  data: () => ({
    currentVideo: {
      title: null,
      link: null
    }
  }),
  computed: {
    ...mapState(['lang']),
  }
}
</script>

<page-query>
query {
  allVideos {
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
  lastVideo: allVideos(limit: 1, order: ASC) {
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
}
</page-query>
