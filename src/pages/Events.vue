<template>
  <Layout>
    <div
      v-for="(pageData, i) in $page.allSiteData.edges"
      :key="`${pageData}_${i}`"
    >
      <h1>{{ pageData.node.pages.events.title[lang] }}</h1>
  
      <div v-if="upcomingEvents.length > 0" >
        <h2>{{ pageData.node.pages.events.upcoming[lang] }}</h2>
  
        <a 
          v-for="event in upcomingEvents"
          :key="`${ event.date }_${ event.time }`"
          href=""
        >
          <p>{{ event.place }}</p>
          <p>{{ event.town }}</p>
          <p>{{ new Date(`${event.date}T${event.time}Z`).toLocaleDateString(localeLang, dateOptions) }}</p>
        </a>
      </div>
  
      <div v-else>
        <h2>{{ pageData.node.pages.events.noEvents[lang] }}</h2>
      </div>

      <div>
        <h2>{{ pageData.node.pages.events.past[lang] }}</h2>

        <a 
          v-for="event in pastEvents"
          :key="`${ event.date }_${ event.time }`"
          href=""
        >
          <p>{{ event.place }}</p>
          <p>{{ event.town }}</p>
          <p>{{ new Date(`${event.date}T${event.time}Z`).toLocaleDateString(localeLang, dateOptions) }}</p>
        </a>
      </div>
    </div>
  </Layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  metaInfo: {
    title: "Events",
  },
  data: () => ({
    upcomingEvents: [],
    pastEvents: [],
    dateOptions: {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  }),
  computed: {
    ...mapState(["lang"]),
    localeLang() {
      if (this.lang === "rs") {
        return "sr-Latn";
      }

      return "en";
    },
  },
  created() {
    this.$page.allEvents.edges.forEach((event) => {
      if (new Date(`${event.node.date}T${event.node.time}Z`) > Date.now()) {
        this.upcomingEvents.push(event.node);
      } else {
        this.pastEvents.push(event.node);
      }
    });
  },
};
</script>

<page-query>
query {
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
  allSiteData {
    edges {
      node {
        pages {
          events {
            title {
              rs
              en
            }
            upcoming {
              rs
              en
            }
            past {
              rs
              en
            }
            noEvents {
              rs
              en
            }
          }
        }
      }
    }
  }
}
</page-query>
