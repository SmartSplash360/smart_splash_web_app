<template>
  <section>
    <UiTheHeroSection></UiTheHeroSection>
  </section>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
});
</script>
