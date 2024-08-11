<script setup lang="ts">

import Header from "~/components/header.vue";
</script>

<template>
  <header>
    <Header/>
  </header>
  <div class="bg-gray-100 min-h-screen px-8 py-5">
    <slot/>
  </div>
</template>

<style scoped>

</style>