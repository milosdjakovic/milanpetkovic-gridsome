<template>
  <transition name="fade-album-overlay">
    <div 
      v-if="selectedAlbum" 
      class="fixed inset-0 z-40 flex items-center justify-center bg-white bg-gray-900 bg-opacity-75"
      @click="() => setAlbum(null)"
    >
      <div 
        class="flex flex-col max-h-screen pt-4 pb-8 rounded-md shadow-lg md:pb-12 md:pt-6"
        style="background-image: url(/images/dark_leather.png);"
        @click.stop
      >
        <button
          @click="() => setAlbum(null)"
          class="self-end w-8 h-8 mx-8 focus:outline-none hover:text-fluo-green"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-x"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
  
        <div class="flex flex-col-reverse px-8 mt-4 overflow-y-auto md:mt-6 md:flex-row">
          <div class="mt-8 md:mt-0">
            <p class="text-lg font-bold">{{selectedAlbum[lang].title}}</p>
      
            <p class="text-sm opacity-75 text-fluo-green">{{selectedAlbum[lang].year}}</p>
      
            <ol class="mt-6 ml-4 list-decimal">
              <li 
              v-for="song in selectedAlbum[lang].songs" 
              :key="`${selectedAlbum[lang].title}_${song}`"
              >
                {{song}}
              </li>
            </ol>
          </div>
          
          <g-image 
            :alt="`${selectedAlbum.cover}`" 
            :src="require(`!!assets-loader!@omoti/${selectedAlbum.cover}.jpg`)" 
            class="m-0 md:ml-12"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['lang', 'selectedAlbum'])
  },
  methods: {
    ...mapMutations(['setAlbum'])
  }
}
</script>

<style scoped>
.fade-album-overlay-enter-active, .fade-album-overlay-leave-active {
  transition: opacity .5s;
}
.fade-album-overlay-enter, .fade-album-overlay-leave-to {
  opacity: 0;
}
</style>