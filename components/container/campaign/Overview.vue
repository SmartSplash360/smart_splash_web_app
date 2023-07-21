<template>
  <section v-if="loading">
    <SkeletonCardListing></SkeletonCardListing>
  </section>
  <section v-else class="-mx-5 -my-6 lg:-mx-10 lg:-my-12 sm:gap-13 flex flex-col gap-8 bg-[#f5fbfc] dark:bg-inherit min-h-screen">
    <RegularCampaignEditTemplateControl :edit="edit"></RegularCampaignEditTemplateControl>
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
    // check campaign type
    if(data.templateType === 1){
        // check if lead 
      if(data.lead){
        await campaignStore.createCampaignEmail({
          title : data.name,
          role_id : 3 ,
          message : data.description,
          campaign_template_id : data.templateId
        });
        toast.add({ severity: 'info', summary: 'Success', detail: 'Email Campaign sent successfully to all Leads', life: 3000 });
      }
      if(data.customer) {
        await campaignStore.createCampaignEmail({
          title : data.name,
          role_id : 3 ,
          message : data.description,
          campaign_template_id : data.templateId
        });
        toast.add({ severity: 'info', summary: 'Success', detail: 'Email Campaign sent successfully to all Customers', life: 3000 });
      }
    } else if(data.templateType === 2){
        // check if lead 
        if(data.lead){
          await campaignStore.createCampaignSMS({
            title : data.name,
            role_id : 3 ,
            message : data.description,
            campaign_template_id : data.templateId
          });
          toast.add({ severity: 'info', summary: 'Success', detail: 'SMS Campaign sent successfully to all Leads', life: 3000 });
        }
        if(data.customer) {
          await campaignStore.createCampaignSMS({
            title : data.name,
            role_id : 3 ,
            message : data.description,
            campaign_template_id : data.templateId
          });
          toast.add({ severity: 'info', summary: 'Success', detail: 'SMS Campaign sent successfully to all Customers', life: 3000 });

        }
    }

  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'An Error occured', life: 3000 });
  }
}
</script>

