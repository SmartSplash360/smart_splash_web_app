<template>
  <span class="p-input-icon-left">
    <i class="pi pi-search" />
    <InputText
      v-model="value"
      placeholder="Search"
      class="dark:bg-[#1B2028] o!utline-none"
      :class="[
        size === 'lg' ? 'min-w-[300px] xl:min-w-[400px]' : ' w-full min-w-full',
      ]"
      @input="$emit('handleSearch', value)"
    />
  </span>
</template>

<script setup>
const value = ref();

const props = defineProps({
  size: String,
});
</script>
