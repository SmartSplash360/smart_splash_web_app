<template>
  <section class="flex flex-col gap-10">
    <div class="hidden items-center justify-between gap-10 sm:flex">
      <ul class="w-full items-center justify-between gap-4 sm:flex xl:w-3/4">
        <RegularCustomerActivityCard></RegularCustomerActivityCard>
        <RegularCustomerActivityCard></RegularCustomerActivityCard>
        <RegularCustomerActivityCard></RegularCustomerActivityCard>
        <RegularCustomerActivityCard></RegularCustomerActivityCard>
      </ul>
      <BaseExportButton></BaseExportButton>
    </div>
    <RegularCustomerTable></RegularCustomerTable>
  </section>
</template>

<script setup></script>
