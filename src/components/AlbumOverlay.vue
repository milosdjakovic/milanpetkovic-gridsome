<template>
  <div 
    v-if="selectedAlbum" 
    class="fixed inset-0 flex items-center justify-center bg-white bg-gray-900 bg-opacity-50"
    @click="() => setAlbum(null)"
  >
    <div 
      class="px-8 py-10 rounded"
      style="background-image: url(/images/dark_leather.png);"
      @click.stop
    >
      <button
        @click="() => setAlbum(null)"
        class="w-8 h-8 focus:outline-none"
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

      <div>
        <g-image 
          :alt="`${selectedAlbum.cover}`" 
          :src="require(`!!assets-loader!@omoti/${selectedAlbum.cover}.jpg`)" 
          width="150" 
        />

        <div>
          <p>{{selectedAlbum[lang].title}}</p>
    
          <p>{{selectedAlbum[lang].year}}</p>
    
          <ol>
            <li 
            v-for="song in selectedAlbum[lang].songs" 
            :key="`${selectedAlbum[lang].title}_${song}`"
            >
              {{song}}
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
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