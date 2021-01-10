<template>
  <div 
    class="text-gray-100"
    style="background-image: url(/images/dark_leather.png);"
  >
    <MobileNav />
    
    <AlbumOverlay />

    <div
      :class="notOnTop"
      class="fixed inset-x-0 top-0 z-30 flex justify-center h-12 border-b-2 border-transparent md:h-16"
      :style="headerBg"
    >
      <Header />
    </div>

    <transition name="fade-page" appear>
      <div>
        <main
          class="relative z-20 flex flex-col text-gray-100 shadow-lg"
          style="background-image: url(./images/dark_leather.png); margin-bottom: calc(100vh - var(--rhodes-div-height) - 4rem)"
        >
          <div class="self-center w-full max-w-6xl min-h-screen px-6 pt-16 pb-12 md:pb-20 md:pt-24">
            <!-- Page content -->
            <slot />
          </div>
    
          <!-- Rhodes keys -->
          <div 
            class="bg-repeat-x rhodes" 
            style="background-image: url(./images/rhodes_keys.svg);"
          />
        </main>
  
      <Footer />
      </div>
    </transition>
  </div>
</template>

<script>
import gsap from 'gsap';

import MobileNav from "../components/MobileNav.vue";
import AlbumOverlay from "../components/AlbumOverlay.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    MobileNav,
    AlbumOverlay,
    Header,
    Footer
  },
  data: () => ({
    notOnTop: "",
    headerBg: ""
  }),
  methods: {
    handleScroll() {
      if (window.scrollY > 0) {
        this.notOnTop = "border-gray-800 shadow-2xl";
        this.headerBg = "background-image: url(./images/dark_leather.png);";
      } else {
        this.notOnTop = "border-transparent";
        this.headerBg = "";
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

<style scoped>
.rhodes {
  background-size: var(--rhodes-image-size);
  height: var(--rhodes-div-height);
}

.fade-page-enter-active {
  transition: opacity .5s, transform .5s;
}

.fade-page-enter {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
