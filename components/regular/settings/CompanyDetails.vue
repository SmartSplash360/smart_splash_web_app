<template>
  <form class="flex flex-col sm:gap-3">
    <div
      class="flex flex-col justify-between gap-8 border-b dark:border-b-gray-600 py-10 sm:flex-row sm:items-center sm:gap-0 sm:py-5"
    >
      <div class="flex flex-col gap-3 sm:gap-4">
        <h2 class="min-w-max heading__h3">Company Profile</h2>
        <span class="min-w-max span__element span__element-light"
          >Update your company logo and details here</span
        >
      </div>
      <div
        class="flex flex-col justify-end gap-3 sm:w-full sm:flex-row sm:gap-5"
      >
        <Button label="Cancel" severity="secondary" outlined />
        <Button label="Save changes" class="!bg-[#0291BF] text-white" />
      </div>
    </div>
    <div
      class="flex flex-col gap-10 border-b dark:border-b-gray-600  py-5 sm:flex-row sm:gap-20 sm:py-10"
    >
      <div class="flex flex-col gap-3 sm:gap-4">
        <h2 class="min-w-max heading__h3">Company Logo</h2>
        <span class="min-w-max span__element span__element-light"
          >Update company logo
        </span>
      </div>
      <div
        class="flex flex-col gap-5 sm:flex-1 sm:flex-row sm:items-center sm:justify-center lg:gap-14"
      >
        <div class="max-h-[120px] max-w-[225px]">
          <img
            :src="SmartPlashLogo"
            alt="Smart-Splash-Logo"
            class="h-full w-full"
          />
        </div>
        <div class="card min-w-[330px]">
          <Toast />
          <FileUpload
            name="demo[]"
            url="./upload.php"
            @upload="onTemplatedUpload($event)"
            :multiple="true"
            accept="image/*"
            :maxFileSize="1000000"
            @select="onSelectedFiles"
            class="bg-yellow-300"
          >
            <template #header="{ chooseCallback, uploadCallback, files }">
              <div
                class="justify-content-between align-items-center flex flex-1 flex-wrap gap-2"
              >
                <div class="flex gap-2">
                  <Button
                    @click="chooseCallback()"
                    icon="pi pi-images"
                    rounded
                    outlined
                  ></Button>
                  <Button
                    @click="uploadEvent(uploadCallback)"
                    icon="pi pi-cloud-upload"
                    rounded
                    outlined
                    severity="success"
                    :disabled="!files || files.length === 0"
                  ></Button>
                </div>
                <ProgressBar
                  :value="totalSizePercent"
                  :showValue="false"
                  :class="[
                    'md:w-20rem h-1rem w-full md:ml-auto',
                    { 'exceeded-progress-bar': totalSizePercent > 100 },
                  ]"
                  ><span class="white-space-nowrap"
                    >{{ totalSize }}B / 1Mb</span
                  ></ProgressBar
                >
              </div>
            </template>
            <template
              #content="{
                files,
                uploadedFiles,
                removeUploadedFileCallback,
                removeFileCallback,
              }"
            >
              <div v-if="files.length > 0">
                <h5 class="heading__h5">Pending</h5>
                <div class="flex flex-wrap gap-5 p-0 sm:p-5">
                  <div
                    v-for="(file, index) of files"
                    :key="file.name + file.type + file.size"
                    class="card flex-column border-1 surface-border align-items-center m-0 flex gap-3 px-6"
                  >
                    <div>
                      <img
                        role="presentation"
                        :alt="file.name"
                        :src="file.objectURL"
                        width="100"
                        height="50"
                        class="shadow-2"
                      />
                    </div>
                    <span class="span__element">{{ file.name }}</span>
                    <div>{{ formatSize(file.size) }}</div>
                    <Badge value="Pending" severity="warning" />
                    <Button
                      icon="pi pi-times"
                      @click="
                        onRemoveTemplatingFile(file, removeFileCallback, index)
                      "
                      outlined
                      rounded
                      severity="danger"
                    />
                  </div>
                </div>
              </div>

              <div v-if="uploadedFiles.length > 0">
                <h5 class="heading__h5">Completed</h5>
                <div class="flex flex-wrap gap-5 p-0 sm:p-5">
                  <div
                    v-for="(file, index) of uploadedFiles"
                    :key="file.name + file.type + file.size"
                    class="card flex-column border-1 surface-border align-items-center m-0 flex gap-3 px-6"
                  >
                    <div>
                      <img
                        role="presentation"
                        :alt="file.name"
                        :src="file.objectURL"
                        width="100"
                        height="50"
                        class="shadow-2"
                      />
                    </div>
                    <span class="span__element">{{ file.name }}</span>
                    <div>{{ formatSize(file.size) }}</div>
                    <Badge value="Completed" class="mt-3" severity="success" />
                    <Button
                      icon="pi pi-times"
                      @click="removeUploadedFileCallback(index)"
                      outlined
                      rounded
                      severity="danger"
                    />
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
      class="flex flex-col gap-10 border-b dark:border-b-gray-600  py-10 sm:flex-row sm:items-center sm:gap-64"
    >
      <div class="flex flex-col gap-3 sm:gap-4">
        <h2 class="min-w-max heading__h3">Company Name</h2>
        <span class="min-w-max span__element span__element-light"
          >Update company name
        </span>
      </div>
      <div class="card justify-content-center flex sm:w-[30rem]">
        <InputText
          type="text"
          class="w-full dark:bg-[#1B2028] rounded-lg px-3 border-gray-300"
          :placeholder="'SMART SPLAH360'"
        ></InputText>
      </div>
    </div>
    <div
      class="flex flex-col gap-10 py-14 xl:flex-row xl:items-center xl:gap-64"
    >
      <div class="flex flex-col gap-4">
        <h2 class="min-w-max heading__h3">Company Address</h2>
        <span class="min-w-max span__element span__element-light"
          >Update company address
        </span>
      </div>
      <div
        class="flex-between w-full flex-col  gap-10 sm:flex-row sm:gap-5 xl:w-1/2"
      >
        <div class="card justify-content-center w-full">
          <div class="card justify-content-center p-float-label flex">
            <Dropdown
              v-model="selectedCity"
              :options="cities"
              filter
              showClear
              optionLabel="name"
              placeholder="Select a City"
              class="md:w-14rem w-full dark:bg-[#1B2028] border-gray-300"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="align-items-center flex">
                  <img
                    :alt="slotProps.value.label"
                    src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                    :class="`flag mr-2 flag-${slotProps.value.code.toLowerCase()}`"
                    style="width: 18px"
                  />
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="align-items-center flex">
                  <img
                    :alt="slotProps.option.label"
                    src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                    :class="`flag mr-2 flag-${slotProps.option.code.toLowerCase()}`"
                    style="width: 18px"
                  />
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Dropdown>
            <label for="dd-city" class="text-md">Select City</label>
          </div>
        </div>
        <div class="card justify-content-center w-full">
          <div class="card justify-content-center p-float-label flex">
            <Dropdown
              v-model="selectedState"
              :options="cities"
              filter
              showClear
              optionLabel="name"
              placeholder="Select State"
              class="md:w-14rem w-full dark:bg-[#1B2028] border-gray-300"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="align-items-center flex">
                  <img
                    :alt="slotProps.value.label"
                    src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                    :class="`flag mr-2 flag-${slotProps.value.code.toLowerCase()}`"
                    style="width: 18px"
                  />
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="align-items-center flex">
                  <img
                    :alt="slotProps.option.label"
                    src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                    :class="`flag mr-2 flag-${slotProps.option.code.toLowerCase()}`"
                    style="width: 18px"
                  />
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Dropdown>

            <label for="dd-city" class="text-md">Select State</label>
          </div>
        </div>
        <div class="card justify-content-center w-full">
          <div class="card justify-content-center p-float-label flex">
            <InputText
              type="number"
              class="w-full dark:bg-[#1B2028] border-gray-300 rounded-lg"
              :placeholder="'32211'"
            ></InputText>

            <label for="dd-city" class="text-md">Zip code</label>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import SmartPlashLogo from "@/assets/images/SmartSplash.png";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const selectedCity = ref();
const selectedState = ref();
const cities = ref([
  { name: "Australia", code: "AU" },
  { name: "Brazil", code: "BR" },
  { name: "China", code: "CN" },
  { name: "Egypt", code: "EG" },
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
  { name: "India", code: "IN" },
  { name: "Japan", code: "JP" },
  { name: "Spain", code: "ES" },
  { name: "United States", code: "US" },
]);


const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
  removeFileCallback(index);
  totalSize.value -= parseInt(formatSize(file.size));
  totalSizePercent.value = totalSize.value / 10;
};

const onClearTemplatingUpload = (clear) => {
  clear();
  totalSize.value = 0;
  totalSizePercent.value = 0;
};

const onSelectedFiles = (event) => {
  files.value = event.files;
  files.value.forEach((file) => {
    totalSize.value += parseInt(formatSize(file.size));
  });
};

const uploadEvent = (callback) => {
  totalSizePercent.value = totalSize.value / 10;
  callback();
};

const onTemplatedUpload = () => {
  toast.add({
    severity: "info",
    summary: "Success",
    detail: "File Uploaded",
    life: 3000,
  });
};

const formatSize = (bytes) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const updatecompanyDetails = () => {
  
}
</script>

<style lang="scss" scoped></style>
