<script>
export default {
  props: {
    item: Object
  },
}
</script>

<template>
  <article class="gallery-item" :item-id="`${item.id}`">
    <img loading="lazy" :src="`https://picsum.photos/id/${item.id}/300/200`"/>
  </article>
</template>

<style>
  /* 
   * Width of each item = Wi
   * Container width = Wc
   * Gap between items = g
   * Items per row in the gallery = n
   * Total space coverd by gaps = G
   * Available space for items per row = Wa
   *
   * G = g * (n - 1)
   * Wa = Wc - G
   * Wi = Wa / n
   */
  .gallery-item {
    flex: 0 0
      calc(
        (100% - (var(--gallery-gap) * (var(--gallery-items-per-row) - 1))) /
          var(--gallery-items-per-row)
      );
      
      img {
        border-radius: calc(4vw / var(--gallery-items-per-row));
        aspect-ratio: 3 / 2;
        object-fit: cover;
    }
  }
</style>
