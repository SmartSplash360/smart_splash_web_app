<template>
  <section>
    <SkeletonReportPage v-if="loading"></SkeletonReportPage>
    <div v-else class="flex flex-col gap-10">
      <RegularReportMobileBoard></RegularReportMobileBoard>
      <RegularReportBoard></RegularReportBoard>
      <div
        class="flex flex-col rounded-lg border py-5 lg:rounded-none lg:border-0 xl:flex-row"
      >
        <div class="w-full xl:w-2/3">
          <RegularReportRouteProfitBreakdown></RegularReportRouteProfitBreakdown>
        </div>
        <div class="-order-1 w-full xl:order-1 xl:w-1/3">
          <RegularReportActiveProperties></RegularReportActiveProperties>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  loading: Boolean,
});
</script>
