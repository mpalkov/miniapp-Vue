<script setup>
  import GalleryItem from './GalleryItem.vue';
  import {ref, onMounted, onUnmounted} from 'vue';
  import {getImages} from '../scripts/getImages.js'
  
  // The actual value is at loadedPagesCount.value
  const loadedPagesCount = ref(1);
  const deletedImages = ref(new Set(['1']));

  const firstImages = await getImages(loadedPagesCount.value);  
  const allImages = ref(firstImages);
  const isLoading = ref(false);
  const getMoreImages = async() => {
    loadedPagesCount.value++;
    isLoading.value = true;
    const newImages = await getImages(loadedPagesCount.value);
    isLoading.value = false;
    allImages.value.push(...newImages); 
  }

  const removeImage = (id) => {
    deletedImages.value.add(id);
  }

  window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;
    if (!isLoading.value && scrollTop + clientHeight >= scrollHeight - 600) {
        getMoreImages();
    }
}, {
    passive: true
});
</script>

<template>
  <section class="gallery">
    <transition name="fade" v-for="item in allImages" :key="item.id">
        <gallery-item :item="item" @click="removeImage(item.id)" v-if="!deletedImages.has(item.id)" />
    </transition>
     <button @click="getMoreImages">MORE</button>
  </section>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: scale(1.4);
}
</style>