<template>
    <div
        class="card   min-w-full min-h-full flex cursor-pointer justify-center"
    >
      <Card class="min-w-full  shadow-md hover:shadow-xl dark:bg-[#1B2028] dark:text-white">
        <template #header>
          <div class="flex items-center justify-center pb-5 text-[#025E7C]">
            <img :src="template.cover" alt="template-icon">
          </div>
        </template>
        <template #title>
          <div class="relative flex justify-between items-start">
          <div class="flex flex-col gap-4">            <h3 class="text-lg font-medium">{{ template.name }}</h3>
            <p class="paragraph__p"> {{ template.description}}</p></div>
            <div class="relative flex items-center justify-between" >
            <div class="card flex justify-content-center">
              <Button type="button"  @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" class="border-none">
                <font-awesome-icon icon="ellipsis-vertical" />
              </Button>
              <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" class="bg-white dark:bg-[#1B2028] text-black dark:text-white"/>
              <Toast />
            </div>
          </div>
          </div>
        </template>
        <template #content v-if="template.position">
            <Button :label="template.position" class="!bg-[#0291BF] text-white rounded-3xl text-xs font-[400]" />
        </template>
      </Card>
    </div>
  </template>
  
  <script setup>
  import { useTemplateStore } from '@/stores/templates';
  import {useToast} from "primevue/usetoast";
  import { useConfirm } from "primevue/useconfirm";

  const props = defineProps({
    template :  Object
  })
  
  const store = useTemplateStore();
  const toast = useToast();
  const confirm = useConfirm();

  const router = useRouter();
  
  const editTemplate = ()=>  router.push(`/campaigns/${props.template.id}`)
  const deleteTemplate = async (id) => {
    try {
      confirm.require({
      message: 'Are you sure you want to proceed?',
      header: 'Delete Template',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        // delete item
        const res = await store.deleteTemplate(id);
        router.push('/campaigns');
        toast.add({ severity: 'info', summary: 'Delete Template', detail: res?.message , life: 3000 });
      },
      reject: () => {}
    })
    } catch (error) {
      console.log('Something Occurent')
    }
  }
  
  const menu = ref();
  const items = ref([
          {
              label: 'View Template',
              icon: 'pi pi-eye',
              command: () => editTemplate()
          },
          {
              label: 'Delete Template',
              icon: 'pi pi-trash',
              command: () => deleteTemplate(props.template.id)
          }
  ]);

const toggle = (event) => {
    menu.value.toggle(event);
};
  </script>