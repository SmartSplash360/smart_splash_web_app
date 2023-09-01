<template>
  <div
    class="flex justify-between items-center bg-black text-white min-h-[57px] px-5 py-2"
  >
    <nuxt-link to="/campaigns" class="flex gap-3 items-center">
      <font-awesome-icon icon="arrow-left" />
      <span class="hidden sm:flex span__element">Back</span>
    </nuxt-link>
    <h4 class="flex-1 text-center heading__h4">
      {{ edit ? "Edit Campaign" : "Create Campaign Template" }}
    </h4>
    <div class="flex flex-col justify-end gap-3 sm:flex-row sm:gap-5">
      <Button label="Save Draft" class="!bg-white text-black" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  edit: Boolean,
});
</script>
