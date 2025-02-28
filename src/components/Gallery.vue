<script setup>
  import GalleryItem from './GalleryItem.vue';
  import {ref, onMounted, onUnmounted} from 'vue';
  import getImages from '../scripts/getImages.js'

  const parsedImgs = getImages();
  //console.log(parsedImgs);
  
  const allImages = ref(parsedImgs);
  // console.log(allImages);
</script>

<template>
  <section class="gallery">
    <gallery-item v-for="item in allImages" :key="item.id" :item="item" />
    <!-- ALL GALLERY-ITEMS -->
  </section>
</template>