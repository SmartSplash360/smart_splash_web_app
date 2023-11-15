<template>
  <div
    v-if="loading"
    class="fixed bottom-0 left-0 right-0 top-0 z-[1200] flex-center bg-[#000000da]"
  >
    <div class="card self-center flex-center w-10">
      <ProgressSpinner strokeWidth="8" />
    </div>
  </div>
</template>
<script setup>
defineProps({
  loading: Boolean,
});
</script>
