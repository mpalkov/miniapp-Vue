<script setup>
  import GalleryItem from './GalleryItem.vue';
  import { onMounted, ref } from 'vue';
  import getImagesData from '@/scripts/getImagesData.js';
  
  const loadedPagesCount = ref(0);
  const deletedImages = ref(new Set());
  const allImages = ref([]);
  const isLoading = ref(false);

  onMounted(() => {
    getMoreImages();
  });

  const getMoreImages = async () => {
    loadedPagesCount.value++;
    isLoading.value = true;
    const newImages = await getImagesData(loadedPagesCount.value);
    isLoading.value = false;
    allImages.value.push(...newImages); 
  };

  const removeImage = (id) => deletedImages.value.add(id);

  window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;
    if (!isLoading.value && (scrollTop + clientHeight >= scrollHeight - 600)) {
        getMoreImages();
    }
  }, {
      passive: true
  });
</script>

<template>
  <section class="gallery">
    <transition name="fade" v-for="item in allImages" :key="item.id">
      <GalleryItem :item="item" @click="removeImage(item.id)" v-if="!deletedImages.has(item.id)" />
    </transition>
  </section>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s, transform 0.4s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: scale(1.4);
}
</style>