<template>
  <form class="flex flex-col sm:gap-3">
    <div
      class="flex flex-col justify-between gap-8 border-b dark:border-b-gray-600 py-10 sm:flex-row sm:items-center sm:gap-0 sm:py-5"
    >
      <div class="flex flex-col gap-3 sm:gap-4">
        <h2 class="lg:min-w-max heading__h3">Company Profile</h2>
        <span class="min-w-max span__element span__element-light"
          >Update your company logo and details here</span
        >
      </div>
      <div
        class="flex flex-col justify-end gap-3 sm:w-full sm:flex-row sm:gap-5"
      >
        <Button label="Cancel" severity="secondary" outlined />
        <Button
          label="Save changes"
          class="!bg-[#0291BF] text-white"
          @click="updatecompanyDetails"
        />
      </div>
    </div>
    <div
      class="flex flex-col gap-10 border-b dark:border-b-gray-600 py-5 sm:flex-row sm:gap-20 sm:py-10"
    >
      <div class="flex flex-col gap-3 sm:gap-4">
        <h2 class="lg:min-w-max heading__h3">Company Logo</h2>
        <span class="min-w-max span__element span__element-light"
          >Update company logo
        </span>
      </div>
      <div
        class="flex flex-col gap-5 sm:flex-1 sm:flex-row items-center sm:justify-center lg:gap-14"
      >
        <div v-if="files.length < 1" class="flex-center">
          <img
            :src="tenant?.cover ? currentLogo : SmartPlashLogo"
            alt=""
            class="h-32 w-32 items-center rounded-full lg:h-[70px] lg:w-[70px]"
          />
        </div>
        <div v-else class="max-h-[80px] max-w-[225px]">
          <img
            :src="files?.objectURL"
            :alt="companyName + ' Logo'"
            class="h-40 w-40 rounded-full object-contain"
          />
        </div>
        <div class="card max-w-[300px]">
          <FileUpload
            name="CompanyLogo[]"
            @upload="onTemplatedUpload($event)"
            :multiple="false"
            accept="image/*"
            :maxFileSize="1000000"
            @select="onSelectedFiles"
            class="bg-yellow-300"
          >
            <template #header="{ chooseCallback }">
              <div class="justify-between items-center flex gap-2">
                <div class="flex gap-2">
                  <Button
                    @click="chooseCallback()"
                    icon="pi pi-cloud-upload"
                    rounded
                    outlined
                  ></Button>
                </div>
              </div>
            </template>
            <template
              #content="{
                uploadedFiles,
                removeUploadedFileCallback,
              }"
            >
              <div v-if="uploadedFiles.length > 0">
                <div class="flex flex-col gap-3 p-0">
                  <Badge value="Completed" severity="success" />
                  <div
                    v-for="(file, index) of uploadedFiles"
                    :key="file.name + file.type + file.size"
                    class="card flex-col border-1 surface-border m-0 flex gap-3 px-6"
                  >
                    <div class="flex-between items-start">
                      <Button
                        icon="pi pi-times"
                        @click="removeUploadedFileCallback(index)"
                        outlined
                        rounded
                        severity="danger"
                        class="!w-6 !h-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template #empty>
              <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
                <span class="underline">Click to upload </span>
                <p>or drag and drop SVG, PNG or JPG</p>
              </div>
            </template>
          </FileUpload>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col gap-10 border-b dark:border-b-gray-600 py-8 sm:flex-row sm:items-center sm:gap-64 sm:justify-between"
    >
      <div class="flex flex-col gap-3 sm:gap-4 lg:w-1/5">
        <h2 class="lg:min-w-max heading__h3">Company Name</h2>
        <span class="min-w-max span__element span__element-light"
          >Update company name
        </span>
      </div>
      <div class="justify-end flex sm:w-[30rem] mr-auto">
        <InputText
          type="text"
          v-model="companyName"
          class="w-full dark:bg-[#1B2028] rounded-lg px-3 border-gray-300"
          :placeholder="companyName"
        ></InputText>
      </div>
    </div>
    <div
      class="flex flex-col gap-10 border-b dark:border-b-gray-600 py-8 sm:flex-row sm:items-center sm:gap-64"
    >
      <div class="flex flex-col gap-3 sm:gap-4 lg:w-1/5">
        <h2 class="lg:min-w-max heading__h3">Company Website</h2>
        <span class="min-w-max span__element span__element-light"
          >Update company website
        </span>
      </div>
      <div class="justify-end flex sm:w-[30rem] mr-auto">
        <InputText
          type="text"
          v-model="companyWebsite"
          class="w-full dark:bg-[#1B2028] rounded-lg px-3 border-gray-300"
          :placeholder="''"
        ></InputText>
      </div>
    </div>
    <div
      class="flex flex-col gap-10 border-b dark:border-b-gray-600 py-8 sm:flex-row sm:items-center sm:gap-64"
    >
      <div class="flex flex-col gap-3 sm:gap-4 lg:w-1/5">
        <h2 class="lg:min-w-max heading__h3">Company contact number</h2>
        <span class="min-w-max span__element span__element-light"
          >Update company contact number
        </span>
      </div>
      <div class="justify-end flex sm:w-[30rem] mr-auto">
        <InputText
          type="text"
          v-model="companyNumber"
          class="w-full dark:bg-[#1B2028] rounded-lg px-3 border-gray-300"
          :placeholder="''"
        ></InputText>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <h2 class="lg:min-w-max heading__h3">
        Company Address :
        <span class="ml-10 font-medium italic"> {{ companyAddress }}</span>
      </h2>
    </div>
    <div
      class="flex flex-col gap-10 py-14 xl:flex-row xl:items-center xl:gap-64"
    >
      <div class="flex flex-col gap-4">
        <h2 class="lg:min-w-max heading__h3">
          Company Address
        </h2>
        <span class="min-w-max span__element span__element-light"
          >Update company address
        </span>
      </div>
      <div
        class="flex-between w-full flex-col gap-10 sm:flex-row sm:gap-5 xl:w-1/2"
      >
        <div class="card justify-content-center w-full">
          <div class="card justify-content-center p-float-label flex">
            <Dropdown
              v-model="selectedState"
              :options="states"
              filter
              showClear
              optionLabel="name"
              placeholder="Select State"
              class="md:w-14rem w-full dark:bg-[#1B2028] border-gray-300"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="align-items-center flex">
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="align-items-center flex">
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Dropdown>

            <label for="dd-city" class="text-md my-[-8px]">Select State</label>
          </div>
        </div>
        <div class="card justify-content-center w-full">
          <div class="card justify-content-center p-float-label flex">
            <Dropdown
              v-model="selectedCity"
              :options="selectedState ? selectedState.cities : []"
              :disabled="!selectedState?.name"
              filter
              showClear
              optionLabel="name"
              placeholder="Select a City"
              class="md:w-14rem w-full dark:bg-[#1B2028] border-gray-300"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="align-items-center flex">
                  <div>{{ slotProps.value }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="align-items-center flex">
                  <div>{{ slotProps.option }}</div>
                </div>
              </template>
            </Dropdown>
            <label for="dd-city" class="text-md my-[-8px]">Select City</label>
          </div>
        </div>
        <div class="card justify-content-center w-full lg:w-1/2">
          <div class="card justify-content-center p-float-label flex">
            <InputText
              type="number"
              v-model="zipCode"
              class="w-full dark:bg-[#1B2028] border-gray-300 rounded-lg"
            ></InputText>

            <label for="dd-city" class="text-md my-[-8px]">Zip code</label>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import SmartPlashLogo from "@/assets/images/SmartSplash.png";
import { useToast } from "primevue/usetoast";
import { stateList } from "@/utils/usaStateName";
import { useTenantStore } from "@/stores/tenants";

const tenantStore = useTenantStore();

const toast = useToast();

const config = useRuntimeConfig();
const imageUrl = config.public.imageUrl;

const companyName = ref();
const companyWebsite = ref();
const companyNumber = ref();
const companyAddress = ref();
const currentLogo = ref();
const zipCode = ref();
const files = ref([]);

const selectedCity = ref();
const selectedState = ref();
const states = ref(stateList);

const tenant = computed(() => tenantStore.getCurrentTenant);

onMounted(async () => {
  await tenantStore.fetchCurrentTenant();

  if (tenant.value) {
    companyName.value = tenant.value?.name;
    companyWebsite.value = tenant.value?.website;
    companyNumber.value = tenant.value?.phone_number;
    companyAddress.value = tenant.value.address;
  }

  if (tenant.value?.cover) {
    if (tenant.value.cover?.includes("public/images/")) {
      let photo = tenant.value.cover.replace("public/images/", "/images/");
      currentLogo.value = `${imageUrl}/${photo}`;
    } else {
      currentLogo.value = tenant.value.cover;
    }
  }
});

const onSelectedFiles = (event) => {
  files.value = event.files[0];
};

const onTemplatedUpload = () => {
  toast.add({
    severity: "info",
    summary: "Success",
    detail: "File Uploaded",
    life: 5000,
  });
};

const updatecompanyDetails = async () => {
  if (
    companyName.value &&
    companyAddress.value &&
    companyNumber.value &&
    companyWebsite.value
  ) {
    try {
      const formData = new FormData();
      formData.append("name", companyName.value);
      formData.append(
        "address",
        `${selectedCity.value} - ${selectedState.value?.name} - ${zipCode.value}`
      );
      formData.append("cover", files.value);
      formData.append("website", companyWebsite.value);
      formData.append("phone_number", companyNumber.value);

      await tenantStore.updateTenant(tenant.value.id, formData);

      toast.add({
        severity: "success",
        summary: "Tenant Details",
        detail: "You updated the tenant info successfully",
        life: 5000,
      });
    } catch (error) {
      toast.add({
        severity: "error",
        summary: "Tenant Details Error",
        detail: `Tenant updated Failed. An error has occurred: ${error?.response?.data?.message}`,
        life: 5000,
      });
    }
  }
};
</script>
