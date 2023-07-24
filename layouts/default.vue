<template>
  <UiTheHeader></UiTheHeader>
  <main>
    <slot></slot>
  </main>
  <UiTheFooter></UiTheFooter>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
