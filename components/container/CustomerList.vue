<template>
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
    <RegularCustomerTable></RegularCustomerTable>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped></style>
