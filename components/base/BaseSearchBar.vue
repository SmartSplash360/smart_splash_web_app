<template>
  <span class="p-input-icon-left">
    <i class="pi pi-search" />
    <InputText
      v-model="value"
      placeholder="Search"
      :class="[
        size === 'lg' ? 'min-w-[300px] xl:min-w-[400px]' : ' w-full min-w-full',
      ]"
    />
  </span>
</template>

<script setup>
const value = ref();

const props = defineProps({
  size: String,
});
</script>

<style lang="scss" scoped></style>
