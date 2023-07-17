<template>
  <section v-if="loading">
    <SkeletonCardListing></SkeletonCardListing>
  </section>
  <section v-else class="-mx-5 -my-6 lg:-mx-10 lg:-my-12 sm:gap-13 flex flex-col gap-16 bg-[#f5fbfc] dark:bg-inherit min-h-screen">
    <RegularCampaignEditTemplateControl :template="template" :edit="edit"></RegularCampaignEditTemplateControl>
    <RegularCampaignEditTemplate :campaignId="campaignId"></RegularCampaignEditTemplate>
  </section>
</template>

<script setup>
import { useTemplateStore } from '@/stores/templates';
  const props = defineProps({
    campaignId : String,
    edit : Boolean
  })
  
  const store = useTemplateStore()
  const loading = ref(false);
  const template = ref()

  onMounted(async () => {
    if(props.campaignId){
      template.value = await store.fetchTemplate(props.campaignId);
    }
  })
</script>

