<script>
export default {
  props: {
    item: Object
  },
}
</script>

<template>
  <article class="gallery-item">
    <img loading="lazy" :src="item.download_url"/>LALALA
  </article>
</template>

<style>
  /* 
  * Width of each item = Wi
  * Container width = Wc
  * Gap betwe
  * Items per row in the gallery en items = g= n
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
      aspect-ratio: 3 / 2;
      object-fit: cover;
      border-radius: calc(4vw / var(--gallery-items-per-row));
    }
    /* transition: 0.6s position; */
  }
</style>
