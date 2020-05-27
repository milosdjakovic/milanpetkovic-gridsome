<template>
  <div 
    @click="$emit('click')" 
    class="flex flex-col items-center m-6 cursor-pointer rounded-b-md group"
  >
    <g-image 
      :alt="`${cover}`" 
      :src="require(`!!assets-loader!@omoti/${cover}.jpg`)" 
      class="border-2 border-transparent group-hover:border-fluo-green"
      style="max-width: 20rem"
    />

    <p 
      class="py-3 text-lg font-semibold group-hover:text-fluo-green"
    >
      {{ title }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["cover", "title"]
};
</script>