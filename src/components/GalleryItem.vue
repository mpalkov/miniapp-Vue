<script>
import { ref } from 'vue';
import LoadingAnimation from './LoadingAnimation.vue';

export default {
  components: {
    LoadingAnimation
  },
  props: {
    item: Object
  },
  setup() {
    const isImageLoaded = ref(false);

    const onImageLoaded = () => {
      isImageLoaded.value = true;
    };

    return {
      isImageLoaded,
      onImageLoaded
    };
  }
};
</script>

<template>
  <article class="gallery-item" :item-id="`${item.id}`">
    <LoadingAnimation v-if="!isImageLoaded" />
    <img v-if="!isImageLoaded" v-show="!isImageLoaded" @load="onImageLoaded" loading="lazy" :src="`https://picsum.photos/id/${item.id}/300/200`"/>
    <img v-if="isImageLoaded" loading="lazy" :src="`https://picsum.photos/id/${item.id}/300/200`"/>
  </article>
</template>

<style>
  .gallery-item {
    flex: 0 0
      calc(
        (100% - (var(--gallery-gap) * (var(--gallery-items-per-row) - 1))) /
          var(--gallery-items-per-row)
      );
      display: flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 3 / 2;
      cursor: pointer;
      
      img {
        border-radius: calc(4vw / var(--gallery-items-per-row));
        aspect-ratio: 3 / 2;
        object-fit: cover;
    }
  }
</style>
