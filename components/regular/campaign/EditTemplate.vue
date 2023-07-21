<template>
  <form class="flex flex-col px-5 lg:px-10">
    <div v-if="edit" class="flex items-start gap-5 lg:self-end">
      <h4 class="heading__h4 w-full font-bold">Select</h4>
      <div class="flex flex-col gap-4">
        <div class="flex items-center">
          <Checkbox v-model="lead" :binary="true" />
          <label for="lead" class="ml-2"> Lead </label>
        </div>
        <div class="flex items-center">
          <Checkbox v-model="customer" :binary="true" />
          <label for="customer" class="ml-2"> Customer </label>
        </div>
      </div>
    </div>
    <div v-if="!edit" class="flex items-start gap-5 lg:self-end">
      <div class="card b flex w-full justify-center sm:w-fit">
        <Dropdown
          @change="selectType(templateType)"
          v-model="templateType"
          :options="types"
          optionLabel="state"
          placeholder="Campaign Type"
          class="w-full dark:bg-[#1B2028] md:w-52"
          required
        />
      </div>
    </div>
    <div class="my-5 flex flex-col gap-5">
      <div class="flex w-full flex-col gap-3">
        <h4 class="heading__h4">Campaign Title*</h4>
        <InputText
          v-model="name"
          :placeholder="name ? name : 'Enter Title'"
          class="w-full min-w-full !outline-none dark:bg-[#1B2028]"
          required
        />
      </div>
      <div v-if="!edit" class="my-10 flex flex-col gap-4">
        <h4 class="heading__h4">Upload cover</h4>
        <img
          :src="imageSrc"
          alt="Uploaded Image"
          v-if="imageSrc"
          class="h-48 w-48 rounded-full"
        />
        <div class="card">
          <!-- <Toast /> -->
          <FileUpload
            name="basic"
            @upload="handleUpload($event)"
            :multiple="true"
            accept="image/*"
            :maxFileSize="1000000"
          >
            <template #empty>
              <p>Drag and drop files to here to upload.</p>
            </template>
          </FileUpload>
        </div>
      </div>
      <div>
        <BaseQuillEditor
          @handle-editor-change="editorChange"
          :description="template?.description ?? ''"
        />
      </div>
    </div>
    <div class="flex justify-end gap-5">
      <Button label="Cancel" @click="cancel" class="!bg-white text-black" />
      <Button
        v-if="!edit"
        label="Save"
        class="hidden !bg-[#0291BF] text-white"
        @click="createTemplate"
      />
      <Button
        v-if="edit"
        :label="campaignType == 2 ? 'Send Email Campagin' : 'Send SMS Campaign'"
        class="hidden !bg-[#0291BF] text-white"
        @click="sendCampaign"
      />
    </div>
  </form>
</template>

<script setup>
import { useTemplateStore } from "@/stores/templates";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const props = defineProps({
  edit: Boolean,
  campaignId: String,
  createCampaign: Function,
});

const router = useRoute();

const { campaignType, templateId } = router.query;

const confirm = useConfirm();
const toast = useToast();

const lead = ref(null);
const customer = ref(null);
const description = ref("");
const name = ref();
const selectedFile = ref(null);
const imageSrc = ref("");
const templateType = ref();
const types = ref([
  { state: "Email Campaign", option: 1 },
  { state: "SMS Campaign", option: 2 },
]);

const store = useTemplateStore();

const template = computed(() => store.getTemplateById(templateId));

onMounted(async () => {
  if (props.campaignId) {
    name.value = template.value?.name;
    templateType.value = template.value?.template_type_id;
  }
});

const editorChange = (value) => (description.value = value);

const selectType = (value) => {
    console.log(value)
  templateType.value = value.option;
};

const handleUpload = (event) => {
  selectedFile.value = event.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    imageSrc.value = e.target.result;
  };
  reader.readAsDataURL(selectedFile.value);
};

const cancel = () => {
  try {
    confirm.require({
      message: "Are you sure you want to cancel?",
      header: "Cancel Template",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        // delete item
        router.replace("/campaigns");
      },
      reject: () => {},
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error Occured",
      life: 3000,
    });
  }
};
const createTemplate = async () => {
  try {
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("description", description.value);
    formData.append("cover", selectedFile.value);
    formData.append("template_type_id", templateType.value);

    await store.createTemplate(formData);
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Template Created",
      life: 3000,
    });
    setTimeout(() => {
      router.replace("/campaigns");
    }, 5000);
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error Occured",
      life: 3000,
    });
  }
};

const sendCampaign = () => {

  props.createCampaign({
    name: name.value,
    description: description.value,
    templateId,
    templateType: templateType.value,
    lead: lead.value,
    customer: customer.value,
  });
};
</script>
