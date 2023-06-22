<template>
  <section class="flex flex-col gap-10">
    <RegularReportBoard></RegularReportBoard>
    <div
      class="flex flex-col rounded-lg border py-5 lg:flex-row lg:rounded-none lg:border-0"
    >
      <div class="w-full lg:w-2/3">
        <RegularReportRouteProfitBreakdown></RegularReportRouteProfitBreakdown>
      </div>
      <div class="-order-1 w-full lg:order-1 lg:w-1/3">
        <RegularReportActiveProperties></RegularReportActiveProperties>
      </div>
    </div>
    <RegularReportMobileBoard></RegularReportMobileBoard>
  </section>
</template>

<script setup></script>
