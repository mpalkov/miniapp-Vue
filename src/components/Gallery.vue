<script setup>
  import GalleryItem from './GalleryItem.vue';
  import {ref, onMounted, onUnmounted} from 'vue';
  import {getImages} from '../scripts/getImages.js'
  
  // The actual value is at loadedPagesCount.value
  const loadedPagesCount = ref(1);

  const firstImages = await getImages(loadedPagesCount.value);  
  const allImages = ref(firstImages);
  const getMoreImages = async() => {
    console.log('LOADING MORE IMAGES', loadedPagesCount.value);
    
    loadedPagesCount.value++;
    const newImages = await getImages(loadedPagesCount.value);
    allImages.value.push(...newImages); 
    console.log('MORE IMAGES LOADED', loadedPagesCount.value);
  }
</script>

<template>
  <section class="gallery">
    <gallery-item v-for="item in allImages" :item="item" />
    <!-- ALL GALLERY-ITEMS -->
     <button @click="getMoreImages">MORE</button>
  </section>
</template>