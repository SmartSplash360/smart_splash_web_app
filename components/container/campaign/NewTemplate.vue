<template>
    <section v-if="loading">
      <SkeletonCardListing></SkeletonCardListing>
    </section>
    <section v-else class="-mx-5 -my-6 lg:-mx-10 lg:-my-12 sm:gap-13 flex flex-col gap-16 bg-[#f5fbfc] dark:bg-inherit min-h-screen">
      <RegularCampaignNewTemplateControl></RegularCampaignNewTemplateControl>
      <RegularCampaignNewTemplateEdit></RegularCampaignNewTemplateEdit>
    </section>
  </template>
  
  <script setup>
    const loading = ref(false)
  
  </script>
  
