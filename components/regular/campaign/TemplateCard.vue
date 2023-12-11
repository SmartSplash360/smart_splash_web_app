<template>
  <div class="flex min-h-full min-w-full cursor-pointer justify-center">
    <Card
      class="min-w-full shadow-md hover:shadow-xl dark:bg-[#1B2028] dark:text-white"
    >
      <template #header>
        <div class="flex-center text-[#025E7C] h-[270px]">
          <img
            v-if="templateCover"
            :src="templateCover"
            :alt="template.name"
            class="w-full h-full"
          />
          <span v-else class="bg-gray-400 w-full h-full"></span>
        </div>
      </template>
      <template #title>
        <div class="w-full lg:w-3/4 flex items-center gap-4 mb-4">
          <span
            class="lg:min-w-1/3 py-1.5 px-2 font-normal rounded-lg text-[10px] text-[#12a537] bg-[#12a53733]"
          >
            sent by: John wick
          </span>
          <span
            class="lg:min-w-1/2 py-1.5 px-2 font-normal rounded-lg text-[10px] text-[#f58d3d] bg-[#ec680633]"
          >
            last sent : April 24 2023
          </span>
        </div>
        <div class="flex items-start justify-between">
          <div class="relative flex flex-col items-start my-4">
            <div class="flex flex-col gap-4 overflow-hidden">
              <h3 class="text-lg font-medium">{{ template.name }}</h3>
              <p
                class="paragraph__p text-gray-400 h-[100px] overflow-hidden text-ellipsis"
                v-html="template.description"
              ></p>
            </div>
          </div>
          <Button
            type="button"
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            class="border-none"
          >
            <font-awesome-icon icon="ellipsis-vertical" />
          </Button>
          <Menu
            ref="menu"
            id="overlay_menu"
            :model="items"
            :popup="true"
            class="bg-white text-black dark:bg-[#1B2028] dark:text-white"
          />
          <!-- <Toast /> -->
        </div>
      </template>
      <template #content>
        <div class="flex justify-between">
          <Button
            :label="template.position"
            class="rounded-3xl !bg-[#0291BF] text-xs font-[400] text-white"
            v-if="template.status"
          />
        </div>
      </template>
    </Card>
    <ModalsCampaignEditTemplate
      v-if="showEditModal"
      :template="template"
      :toggleEditTemplateModal="toggleEditTemplateModal"
    >
    </ModalsCampaignEditTemplate>
  </div>
</template>

<script setup>
import { useTemplateStore } from "@/stores/templates";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const props = defineProps({
  template: Object,
  campaignType: Number,
});

const config = useRuntimeConfig();
const imageUrl = config.public.imageUrl;

const showEditModal = ref(false);
const store = useTemplateStore();
const toast = useToast();
const confirm = useConfirm();

const router = useRouter();
const menu = ref();
const items = ref([
  {
    label: "View Template",
    icon: "pi pi-eye",
    command: () => viewTemplate(),
  },
  {
    label: "Delete Template",
    icon: "pi pi-trash",
    command: () => deleteTemplate(props.template.id),
  },
]);
const templateCover = ref();
const toggle = (event) => {
  menu.value.toggle(event);
};

onMounted(() => {
  if (props.template?.cover) {
    if (props.template.cover.includes("public/images/")) {
      let cover = props.template.cover.replace("public/images/", "/images/");
      templateCover.value = `${imageUrl}/${cover}`;
    } else {
      templateCover.value = props.template.cover;
    }
  }
});

const toggleEditTemplateModal = () => (showEditModal.value = false);
const editTemplate = () => (showEditModal.value = !showEditModal.value);
const viewTemplate = () =>
  router.push(
    `/campaigns/${props.template.id}?campaignType=${props.campaignType}&templateId=${props.template.id}`
  );
const deleteTemplate = async (id) => {
  try {
    confirm.require({
      message: "Are you sure you want to proceed?",
      header: "Delete Template",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        // delete item
        const res = await store.deleteTemplate(id);
        toast.add({
          severity: "info",
          summary: "Delete Template",
          detail: res?.message,
          life: 5000,
        });
        await store.fetchTemplates();
      },
      reject: () => {},
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error Occured",
      life: 5000,
    });
  }
};
</script>
