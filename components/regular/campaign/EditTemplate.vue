<template>
  <form class="flex flex-col px-5 lg:px-10">
    <div v-if="edit" class="flex flex-col gap-3 lg:self-end">
      <div class="flex items-start gap-5">
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
      <p class="min-h-[20px]">
        <span v-show="errorCampaignType" class="text-[#D42F24] text-xs">{{
          errorCampaignType
        }}</span>
      </p>
    </div>
    <div v-if="!edit" class="flex flex-col items-start gap-2 lg:self-end">
      <div class="card b flex w-full justify-center sm:w-fit">
        <Dropdown
          @change="selectType(templateTypeName)"
          v-model="templateTypeName"
          :options="types"
          optionLabel="state"
          placeholder="Campaign Type"
          class="w-full dark:bg-[#1B2028] md:w-52"
          :class="errorTemplateType && 'border-red-300'"
          required
        />
      </div>
      <p class="min-h-[20px]">
        <span v-show="errorTemplateType" class="text-[#D42F24] text-xs">{{
          errorTemplateType
        }}</span>
      </p>
    </div>
    <div class="my-2 flex flex-col gap-3">
      <div class="flex w-full flex-col gap-2">
        <h4 class="heading__h4">Campaign Title*</h4>
        <InputText
          v-model="name"
          :placeholder="name ? name : 'Enter Title'"
          class="w-full min-w-full !outline-none dark:bg-[#1B2028]"
          :class="errorName && 'border-red-300'"
          required
          @blur="handleChangeName"
        />
        <p class="min-h-[20px]">
          <span v-show="errorName" class="text-[#D42F24] text-xs">{{
            errorName
          }}</span>
        </p>
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
            :multiple="false"
            accept="image/*"
            :maxFileSize="1000000"
          >
            <template #empty>
              <p>Drag and drop files to here to upload.</p>
            </template>
          </FileUpload>
        </div>
        <p class="min-h-[20px]">
          <span v-show="errorCover" class="text-[#D42F24] text-xs">{{
            errorCover
          }}</span>
        </p>
      </div>
      <div>
        <BaseQuillEditor
          @handle-editor-change="editorChange"
          :description="template?.description ?? ''"
        />
        <p class="min-h-[20px] mt-3">
          <span v-show="errorDescrption" class="text-[#D42F24] text-sm">{{
            errorDescrption
          }}</span>
        </p>
      </div>
    </div>
    <div class="flex justify-end gap-5">
      <Button label="Cancel" @click="cancel" class="!bg-white text-black" />
      <Button
        v-if="!edit"
        label="Save"
        class="!bg-[#0291BF] text-white"
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
  campaignId: {
    type: String,
    default: () => null,
    required: false,
  },
  edit: {
    type: Boolean,
    default: () => false,
    required: false,
  },
  createCampaign: {
    type: Function,
  },
});

const route = useRoute();
const router = useRouter();

const { campaignType, templateId } = route.query;

const confirm = useConfirm();
const toast = useToast();
const types = ref([
  { state: "Email Campaign", option: 2 },
  { state: "SMS Campaign", option: 1 },
]);

const lead = ref(null);
const customer = ref(null);
const description = ref("");
const name = ref("");
const selectedFile = ref(null);
const imageSrc = ref("");
const templateTypeName = ref("");
const templateType = ref();

const errorCampaignType = ref("");
const errorDescrption = ref("");
const errorName = ref("");
const errorCover = ref("");
const errorTemplateType = ref("");

const disableSubmit = ref(false);
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
  if (!templateTypeName.value) {
    errorTemplateType.value = "Please choose a campaign type";
    return;
  } else {
    errorTemplateType.value = "";
    templateType.value = value.option;
  }
};
const handleChangeName = () => {
  errorName.value = name.value ? "" : "The title field is required";
};
const handleUpload = (event) => {
  selectedFile.value = event.files[0];
  if (!selectedFile.value) {
    errorCover.value = "Please Select a file and upload";
    return;
  } else {
    errorCover.value = "";
    const reader = new FileReader();
    reader.onload = (e) => {
      imageSrc.value = e.target.result;
    };
    reader.readAsDataURL(selectedFile.value);
  }
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
      life: 5000,
    });
  }
};
const createTemplate = async () => {
  if (!templateType.value) {
    errorTemplateType.value = "Please choose a campaign type";
    return;
  }
  if (!name.value) {
    errorName.value = "The title field is required";
    return;
  }
  if (!selectedFile.value) {
    errorCover.value = "Please select a file and press upload";
    return;
  }
  if (!description.value) {
    errorDescrption.value = "Please add a description to your template";
    return;
  }
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
      life: 5000,
    });
    setTimeout(() => {
      window.location.href = "/campaigns";
    }, 5000);
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error Occured",
      life: 5000,
    });
  }
};
const sendCampaign = () => {
  if (!lead.value && !customer.value) {
    errorCampaignType.value = "Please select a recipient";
    return;
  }

  props.createCampaign({
    name: name.value,
    description: description.value,
    templateId,
    templateType: Number(campaignType),
    lead: lead.value,
    customer: customer.value,
  });
};
</script>
