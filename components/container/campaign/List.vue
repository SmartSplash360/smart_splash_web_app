<template>
    <section v-if="loading">
      <SkeletonCardListing></SkeletonCardListing>
    </section>
    <section v-else class="-mx-5 -my-6 lg:-mx-10 lg:-my-12 sm:gap-13 px-5 py-6 lg:px-10 lg:py-12 flex flex-col gap-16 bg-[#f5fbfc] dark:bg-inherit min-h-screen">
      <RegularCampaignBoard 
        @search-template="(value) => handleSearch(value)"
        @select-type="(value) => handleSelectType(value)">
      </RegularCampaignBoard>
      <div v-if="count > 0">
      <div class="card-container grid items-center justify-between">
          <RegularCampaignTemplateCard v-for="template in templates"
          :key="template.id"
          :template="template"
          :campaignType="type"
        ></RegularCampaignTemplateCard>
        </div>
      </div>
      <div v-else>
        <p class="paragraph__p">No Template available</p>
      </div>
    </section>
  </template>
  
  <script setup>
import { useTemplateStore } from '@/stores/templates'

const loading = ref(false)

const store = useTemplateStore();
const templates = ref()
const count = store.getTemplateCount

const type = ref(2);

onMounted(() => {
  templates.value = store.getTemplates;
})

const handleSelectType = (value) => {
  type.value = value

  if(value === 2){
    templates.value = store.getTemplateTypeEmail
  } else if(value === 3){
    templates.value = store.getTemplateTypeSMS
  } else {
    templates.value = store.getTemplates
  }
}

const handleSearch = (value) => {
  store.searchQuery = value
  templates.value = store.filteredTemplates(value);
}
</script>

<style scoped>
.card-container {
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  row-gap: 80px;
  column-gap: 50px;
}
</style>
  