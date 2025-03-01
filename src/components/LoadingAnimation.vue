<script>
</script>

<template>
  <div class="loading"></div>
</template>

<style>
  .loading{
      height:25px;
      width: 25px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor:progress;

      border-radius: 50%;
      border-top: 3px solid #bcbaad;
      border-bottom: 3px solid transparent;
      border-left: 3px solid #bcbaad;
      border-right: 3px solid transparent;

      animation: loading 1s linear infinite;
  }

  @keyframes loading {
    0% {
    transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>