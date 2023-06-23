<template>
  <section class="flex flex-col gap-10">
    <div
      class="hidden flex-wrap items-center justify-between sm:flex xl:gap-10"
    >
      <ul class="flex w-full items-center justify-between gap-4 xl:w-3/4">
        <RegularCustomerActivityCard></RegularCustomerActivityCard>
      </ul>
      <BaseExportButton></BaseExportButton>
    </div>
    <RegularCustomerTable></RegularCustomerTable>
  </section>
</template>

<script setup></script>
