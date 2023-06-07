<template>
  <div class="relative flex">
    <input
      type="text"
      name="search-bar"
      placeholder="Search"
      class="h-[40px] w-[350px] rounded-lg border px-5 text-sm leading-[18px] outline-none"
    />
    <span class="absolute right-2 top-1">
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
    </span>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
