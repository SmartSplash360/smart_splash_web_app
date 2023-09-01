<template>
  <div
    @click="toggleAddServiceModal({ show: false })"
    class="fixed bottom-0 left-0 right-0 top-0 z-[1000] flex-center bg-[#000000da]"
  >
    <form
      @click.stop
      class="flex min-w-full flex-col gap-5 rounded-md bg-white dark:bg-[#31353F] dark:text-white p-10 lg:min-w-[950px] lg:max-w-[950px]"
    >
      <h2 class="heading__h2 font-bold text-[#025E7C]">
        {{ service ? "Edit" : "New" }} Service
        {{ service ? `#${service?.id}` : "" }}
      </h2>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-1">
          <label class="span__element" for="name"> Name* </label>
          <InputText
            type="text"
            v-model="name"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            :class="errorName && 'border-red-300'"
            @blur="handleChangeName"
          >
          </InputText>
          <p class="min-h-[10px]">
            <span v-show="errorName" class="text-[#D42F24] text-xs">{{
              errorName
            }}</span>
          </p>
        </div>
        <div class="flex w-full flex-col gap-1">
          <label class="span__element" for="name"> Price* </label>
          <InputNumber
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            :class="errorPrice && 'border-red-300'"
            v-model="price"
            inputId="currency-us"
            mode="currency"
            currency="USD"
            locale="en-US"
            @blur="handleChangePrice"
          >
          </InputNumber>
          <p class="min-h-[10px]">
            <span v-show="errorPrice" class="text-[#D42F24] text-xs">{{
              errorPrice
            }}</span>
          </p>
        </div>
      </div>
      <div class="card justify-content-center flex flex-col gap-1">
        <label class="span__element" for="description">
          Description (10 to 300 characters)
        </label>
        <Textarea
          class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
          v-model="description"
          autoResize
          rows="3"
          cols="70"
          :class="errorDescription && 'border-red-300'"
          @blur="handleChangeDescription"
        />
        <p class="min-h-[10px]">
          <span v-show="errorDescription" class="text-[#D42F24] text-xs">{{
            errorDescription
          }}</span>
        </p>
      </div>
      <div class="card justify-content-center flex flex-col gap-1">
        <label class="span__element" for="notes">
          Notes (10 to 300 characters)
        </label>
        <Textarea
          class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
          v-model="notes"
          autoResize
          rows="3"
          cols="70"
          :class="errorNotes && 'border-red-300'"
          @blur="handleChangeNote"
        />
        <p class="min-h-[10px]">
          <span v-show="errorNotes" class="text-[#D42F24] text-xs">{{
            errorNotes
          }}</span>
        </p>
      </div>
      <div class="card justify-content-center flex flex-col gap-1">
        <label class="span__element" for="notes"> Is Available? </label>
        <InputSwitch v-model="isAvailable" />
      </div>
      <div class="flex flex-col gap-2 max-h-[150px] overflow-y-auto">
        <h4 class="heading__h4 text-gray-600">List of subservices</h4>
        <ul class="flex flex-wrap gap-2">
          <li
            class="max-w-fit flex gap-3 items-center bg-[#D9ECF5] px-4 py-1 rounded-xl shadow-sm"
            v-for="suServ in subservices"
            :key="suServ"
          >
            <font-awesome-icon icon="toolbox" class="text-gray-500" />
            <span class="span__element">
              {{ suServ }}
            </span>
            <font-awesome-icon
              icon="circle-xmark"
              class="span__element cursor-pointer text-red-500"
              @click="handleRemoveSubservice(suServ)"
            />
          </li>
        </ul>
      </div>
      <div
        class="flex gap-3 items-center cursor-pointer"
        @click="showSubserviceInput = !showSubserviceInput"
      >
        <font-awesome-icon
          icon="circle-plus"
          class="text-2xl text-[#0291BF] hover:scale-110 duration-150"
        />
        <span class="span__element text-sm">Add subservice</span>
      </div>
      <div v-if="showSubserviceInput" class="flex flex-col gap-1">
        <InputText
          type="text"
          v-model="subservice"
          class="w-full dark:bg-[#1B2028] border-0 border-b border-gray-300 px-0 dark:text-white focus:outline-0"
          @blur="handleChangeSubservice"
          @keyup.enter="handleAddSubservice"
        >
        </InputText>
      </div>
      <div class="flex flex-col justify-end gap-5 sm:flex-row">
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          @click="toggleAddServiceModal({ show: false })"
          class="hover:shadow-xl"
        />
        <Button
          label="Submit"
          icon="pi pi-check"
          class="!bg-[#0291BF] hover:shadow-xl text-white"
          @click="service ? updateService() : createService()"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { useServiceStore } from "~/stores/services";

const { toggleAddServiceModal, service } = defineProps([
  "toggleAddServiceModal",
  "service",
]);

const serviceStore = useServiceStore();

const isAvailable = ref(true);
const notes = ref("");
const name = ref("");
const description = ref("");
const price = ref(1.0);
const subservice = ref("");
const subservices = ref([]);
const showSubserviceInput = ref(false);

const errorNotes = ref("");
const errorName = ref("");
const errorDescription = ref("");
const errorPrice = ref("");
const errorSubservice = ref("");

onMounted(() => {
  if (service) {
    isAvailable.value = service.is_available === 1;
    notes.value = service.notes;
    name.value = service.name;
    description.value = service.description;
    price.value = service.price;
  }
});

const handleChangeName = () => {
  errorName.value = name.value ? "" : "The name field is required";
};
const handleChangeDescription = () => {
  errorDescription.value = description.value
    ? description.value.length > 300
      ? "Please enter between 10 and 300 characters"
      : ""
    : "The description field is required";
};
const handleChangePrice = () => {
  errorPrice.value = price.value ? "" : "The price field is required";
};
const handleChangeNote = () => {
  errorNotes.value = notes.value
    ? notes.value.length > 300
      ? "Please provide between 10 and 300 characters for notes"
      : ""
    : "The note field is required";
};
const handleChangeSubservice = () => {
  errorSubservice.value = subservice.value
    ? ""
    : "The subservice name field is required";
};

const validateForm = () => {
  handleChangeName();
  handleChangeDescription();
  handleChangePrice();
  handleChangeNote();
  return (
    !errorName.value &&
    !errorDescription.value &&
    !errorPrice.value &&
    !errorNotes.value
  );
};

const handleAddSubservice = (event) => {
  subservices.value.push(event.target.value);
  subservice.value = "";
  showSubserviceInput.value = false;
};
const handleRemoveSubservice = (subservice) => {
  subservices.value.splice(subservices.value.indexOf(subservice), 1);
};

const createService = async () => {
  if (validateForm()) {
    try {
      await serviceStore.createService({
        name: name.value,
        description: description.value,
        price: price.value,
        notes: notes.value,
        is_available: isAvailable.value,
      });

      subservices.value?.forEach(async (subservice) => {
        await serviceStore.createSubService(subservice);
      });

      await serviceStore.fetchServices();
      toggleAddServiceModal({ success: "Service created successfully" });
    } catch (e) {
      toggleAddServiceModal({ error: e });
    }
  }
};
const updateService = async () => {
  if (validateForm()) {
    try {
      const data = {
        name: name.value,
        description: description.value,
        price: price.value,
        notes: notes.value,
        is_available: isAvailable.value,
      };

      await serviceStore.updateService(service?.id, data);
      toggleAddServiceModal({
        success: `Service ${service?.id} updated successfully`,
      });
    } catch (e) {
      toggleAddServiceModal({ error: e });
    }
  }
};
</script>
