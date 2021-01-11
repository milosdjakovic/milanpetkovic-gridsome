<template>
  <Layout>
    <div
      v-for="(pageData, i) in $page.allSiteData.edges"
      :key="`${pageData}_${i}`"
    >
      <!-- Upcoming events -->
      <div v-if="upcomingEvents.length > 0">
        <h2 class="text-3xl text-fluo-green">
          {{ pageData.node.pages.events.upcoming[lang] }}
        </h2>

        <a
          v-for="event in upcomingEvents"
          :key="`${event.date}_${event.time}`"
          :href="event.link"
          class="block pb-3 mt-4 transition-colors duration-300 ease-in-out cursor-pointer group hover:shadow-bottom-fluo"
        >
          <p class="text-xl group-hover:text-fluo-green">{{ event.place }}</p>
          <p
            class="text-sm font-bold text-gray-400 group-hover:text-fluo-green"
          >
            {{ event.town }}
          </p>

          <p class="font-bold text-fluo-green group-hover:text-gray-400">
            {{
              new Date(`${event.date}T${event.time}Z`).toLocaleDateString(
                localeLang,
                dateOptions
              )
            }}
          </p>
        </a>
      </div>

      <!-- No upcoming events -->
      <div v-else>
        <h2 class="text-2xl text-fluo-green">
          {{ pageData.node.pages.events.noEvents[lang] }}
        </h2>
      </div>

      <!-- Past events -->
      <div class="mt-6">
        <h2 class="text-2xl">{{ pageData.node.pages.events.past[lang] }}</h2>

        <a
          v-for="event in pastEvents"
          :key="`${event.date}_${event.time}`"
          :href="event.link"
          class="block pb-3 mt-4 transition-colors duration-300 ease-in-out opacity-50 cursor-pointer hover:opacity-100 hover:shadow-bottom-fluo"
        >
          <p class="text-xl">{{ event.place }}</p>
          <p class="text-sm font-bold text-gray-400">{{ event.town }}</p>
          <p class="font-bold text-fluo-green">
            {{
              new Date(`${event.date}T${event.time}Z`).toLocaleDateString(
                localeLang,
                dateOptions
              )
            }}

            <span> — {{ event.time }}h</span>
          </p>
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
