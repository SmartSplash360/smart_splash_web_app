<template>
    <div class="min-w-full min-h-full flex cursor-pointer justify-center">
      <Card class="min-w-full  shadow-md hover:shadow-xl dark:bg-[#1B2028] dark:text-white">
        <template #header>
          <div class="flex-center pb-5 text-[#025E7C] px-3 py-5">
            <img :src="template.cover" alt="template-icon">
          </div>
        </template>
        <template #title>
          <div class="flex justify-between items-start">
            <div class="relative flex flex-col items-start">
            <div class="flex flex-col gap-4">            
              <h3 class="text-lg font-medium">{{ template.name }}</h3>
              <p class="paragraph__p text-gray-400" v-html="template.description"> </p>
            </div>
          </div>
          <Button type="button"  @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" class="border-none">
            <font-awesome-icon icon="ellipsis-vertical" />
          </Button>
          <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" class="bg-white dark:bg-[#1B2028] text-black dark:text-white"/>
          <Toast />
        </div>
        </template>
        <template #content>
            <div class="flex justify-between">
              <Button :label="template.position" class="!bg-[#0291BF] text-white rounded-3xl text-xs font-[400]" v-if="template.status"/>
            </div>
        </template>
      </Card>
      <ModalsCampaignEditTemplate 
        v-if="showEditModal"
        :template="template"
        :toggleEditTemplateModal="toggleEditTemplateModal">
      </ModalsCampaignEditTemplate>
    </div>
  </template>
  
  <script setup>
  import { useTemplateStore } from '@/stores/templates';
  import {useToast} from "primevue/usetoast";
  import { useConfirm } from "primevue/useconfirm";

  const props = defineProps({
    template :  Object
  })
  
  const showEditModal = ref(false);
  const store = useTemplateStore();
  const toast = useToast();
  const confirm = useConfirm();

  const router = useRouter();

  const toggleEditTemplateModal = () =>  showEditModal.value = false
  
  const viewTemplate = ()=>  router.push(`/campaigns/${props.template.id}`)
  const editTemplate = () => {
    showEditModal.value = !showEditModal.value
  }
  const deleteTemplate = async (id) => {
    try {
      confirm.require({
      message: 'Are you sure you want to proceed?',
      header: 'Delete Template',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        // delete item
        const res = await store.deleteTemplate(id);
        toast.add({ severity: 'info', summary: 'Delete Template', detail: res?.message , life: 3000 });
        window.location.href = 'http://localhost:3000/campaigns';
      },
      reject: () => {}
    })
    } catch (error) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Error Occured', life: 3000 });

    }
  }
  
  const menu = ref();
  const items = ref([
        {
            label: 'View Template',
            icon: 'pi pi-eye',
            command: () => viewTemplate()
        },
        {
            label: 'Edit Template',
            icon: 'pi pi-pencil',
            command: () => editTemplate()
        },
        {
            label: 'Delete Template',
            icon: 'pi pi-trash',
            command: () =>  deleteTemplate(props.template.id)
        }
  ]);
  const toggle = (event) => {
      menu.value.toggle(event);
  };
  </script>