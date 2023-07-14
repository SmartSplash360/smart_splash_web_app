<template>
    <section v-if="loading">
      <SkeletonCardListing></SkeletonCardListing>
    </section>
    <section v-else class="-mx-5 -my-6 lg:-mx-10 lg:-my-12 sm:gap-13 px-5 py-6 lg:px-10 lg:py-12 flex flex-col gap-16 bg-[#f5fbfc] dark:bg-inherit min-h-screen">
      <RegularCampaignBoard></RegularCampaignBoard>
      <div class="card-container grid items-center justify-between gap-x-5 gap-y-10">
        <RegularCampaignTemplateCard v-for="template in templates"
          :key="template.id"
          :template="template"
        ></RegularCampaignTemplateCard>
      </div>
    </section>
  </template>
  
  <script setup>
import {TemplateList} from "@/services/Templates";

const templates = ref();
const loading = ref(false)
onMounted(() => {
    TemplateList.getTemplatesSmall().then((data) => (templates.value = data));
    loading.value = false;
});
  
  
  </script>
  
  <style scoped>
  .card-container {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    row-gap: 50px;
    column-gap: 50px;
  }
  </style>
  