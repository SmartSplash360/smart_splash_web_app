<template>
  <div class="bg-grey-200 flex h-[100vh]">
    <UiTheSidebar></UiTheSidebar>
    <section class="w-full">
      <UiTheNavbar></UiTheNavbar>
      <div class="max-h-[90vh] overflow-y-auto px-10 py-10">
        <ContainerCustomerList></ContainerCustomerList>
        <!-- <ContainerCustomerOverview></ContainerCustomerOverview> -->
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "",
});
</script>

<style lang="scss" scoped></style>
