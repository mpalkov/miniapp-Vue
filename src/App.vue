<script setup>
import GalleryComponent from './components/GalleryComponent.vue';
</script>

<template>
  <main>
    <Suspense>
      <GalleryComponent />
    </Suspense>
  </main>
</template>

<style>
/* Gallery layout */
:root {
  --gallery-gap: 1.5rem;
  --gallery-items-per-row: 2;
  --gallery-item-border-radius: 1rem;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gallery-gap);
}

@media (width >= 1024px) {
  :root {
    --gallery-gap: 1.6rem;
  }
  .gallery {
    --gallery-items-per-row: 4;
  }
}

@media (750px < width < 1024px) {
  :root {
    --gallery-gap: 1.4rem;
  }
  .gallery {
    --gallery-items-per-row: 3;
  }
}

@media (width <= 750px) {
  :root {
    --gallery-gap: 1rem;
  }
  .gallery {
    --gallery-items-per-row: 2;
  }
}
</style>
