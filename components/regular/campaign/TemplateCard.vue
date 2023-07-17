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
          <div class="relative flex flex-col items-start">
            <div class="flex flex-col gap-4">            
              <h3 class="text-lg font-medium">{{ template.name }}</h3>
              <p class="paragraph__p" v-html="template.description"> </p>
            </div>

          </div>
        </template>
        <template #content>
            <div class="flex justify-between">
              <Button :label="template.position" class="!bg-[#0291BF] text-white rounded-3xl text-xs font-[400]" v-if="template.status"/>
              <div class="relative flex items-center justify-between self-end mt-10 ml-auto" >
                <div class="card flex gap-2">
                  <Button
                      icon="pi pi-eye"
                      text raised rounded
                      @click="viewTemplate()"
                  />
                  <Button
                      icon="pi pi-pencil"
                      text raised rounded
                      class="p-button-danger"
                      @click="editTemplate(template)"
                  />
                  <Button
                      icon="pi pi-trash"
                      text raised rounded
                      class="p-button-danger"
                      @click="deleteTemplate(template.id)"
                  />
                  <!-- <Button type="button"  @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" class="border-none">
                    <font-awesome-icon icon="ellipsis-vertical" />
                  </Button>
                  <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" class="bg-white dark:bg-[#1B2028] text-black dark:text-white"/>
                  <Toast /> -->
                </div>
              </div>
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
        router.push('/campaigns');
        toast.add({ severity: 'info', summary: 'Delete Template', detail: res?.message , life: 3000 });
      },
      reject: () => {}
    })
    } catch (error) {
      console.log('Something Occurent')
    }
  }
  
  // const menu = ref();
  // const items = ref([
  //         {
  //             label: 'View Template',
  //             icon: 'pi pi-eye',
  //             command: () => viewTemplate()
  //         },
  //         {
  //             label: 'Delete Template',
  //             icon: 'pi pi-trash',
  //             command: () => deleteTemplate(props.template.id)
  //         }
  // ]);
// const toggle = (event) => {
//     menu.value.toggle(event);
// };
  </script>