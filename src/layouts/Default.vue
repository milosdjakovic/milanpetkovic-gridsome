<template>
  <div class="text-gray-100">
    <AlbumOverlay />

    <div
      :class="notOnTop"
      class="fixed inset-x-0 z-30 flex justify-center h-12 border-b-2 border-transparent md:h-16"
      style="background-image: url(/images/dark_leather.png);"
    >
      <Header />
    </div>

    <main 
      class="relative z-20 min-h-screen pt-12 shadow-lg md:pt-16"
      style="background-image: url(/images/dark_leather.png); margin-bottom: calc(100vh - 4rem)"
    >
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script>
import AlbumOverlay from '../components/AlbumOverlay.vue'
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  components: {
    AlbumOverlay,
    Header,
    Footer
  },
  data: () => ({
    notOnTop: ""
  }),
  methods: {
    handleScroll() {
      if (window.scrollY > 0) {
        this.notOnTop = "border-gray-800 shadow-2xl";
      } else {
        this.notOnTop = "border-transparent";
      }
    }
  },
  mounted: function() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>