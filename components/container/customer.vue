<template>
  <div class="flex w-full flex-col gap-10">
    <UiTheNavbar></UiTheNavbar>
    <section class="flex flex-col gap-20 p-10">
      <div class="flex items-center justify-between">
        <ul class="flex w-3/4 items-center justify-between">
          <RegularActivityCard></RegularActivityCard>
          <RegularActivityCard></RegularActivityCard>
          <RegularActivityCard></RegularActivityCard>
          <RegularActivityCard></RegularActivityCard>
        </ul>
        <BaseExportButton></BaseExportButton>
      </div>
      <RegularCustomerList></RegularCustomerList>
    </section>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
