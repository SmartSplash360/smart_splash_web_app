<template>
  <section v-if="loading">
    <SkeletonCardListing></SkeletonCardListing>
  </section>
  <section v-else class="-mx-5 -my-6 lg:-mx-10 lg:-my-12 sm:gap-13 flex flex-col gap-16 bg-[#f5fbfc] dark:bg-inherit min-h-screen">
    <RegularCampaignEditTemplateControl :template="template" :edit="edit"></RegularCampaignEditTemplateControl>
    <RegularCampaignEditTemplate  :campaignId="campaignId" :edit="edit" :createCampaign="createCampaign"></RegularCampaignEditTemplate>
  </section>
</template>

<script setup>
import { useTemplateStore } from '@/stores/templates';
import { useCampaignStore } from '@/stores/campaign';    
import { useToast } from "primevue/usetoast";

const toast = useToast();
const props = defineProps({
  campaignId : String,
  edit : Boolean
})
  
  const templateStore = useTemplateStore()
  const campaignStore = useCampaignStore()
  const loading = ref(false);
  const template = ref()

  onMounted(async () => {
    if(props.campaignId){
      template.value = await templateStore.fetchTemplate(props.campaignId);
    }
  })

  const createCampaign = async (data) => {
    try {
      // check if lead 
      if(data.lead){
        const leadCampaign = {
          title : data.name,
          role_id : 3 ,
          message : data.description,
          campaign_template_id : data.templateId
        }
        await campaignStore.createCampaign(leadCampaign);
      }
      if(data.customer) {
        const customerCampaign = {
          title : data.name,
          role_id : 3 ,
          message : data.description,
          campaign_template_id : data.templateId
        }
        await campaignStore.createCampaign(customerCampaign);
      }
      toast.add({ severity: 'info', summary: 'Success', detail: '', life: 3000 });

    } catch (error) {
      toast.add({ severity: 'danger', summary: 'Error', detail: '', life: 3000 });
    }
  }
</script>

