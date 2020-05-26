<template>
  <div @click="$emit('click')" class="cursor-pointer">
    <g-image :alt="`${cover}`" :src="require(`!!assets-loader!@omoti/${cover}.jpg`)" width="150" />

    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: ["cover", "title"]
};
</script>