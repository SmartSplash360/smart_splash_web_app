<template>
  <form
    class="flex min-w-full flex-col gap-4 rounded-md bg-white dark:bg-[#31353F] dark:text-white"
  >
    <div class="flex items-center gap-4 text-[#025E7C] mb-4">
      <nuxt-link to="/products">
        <font-awesome-icon icon="chevron-left" />
      </nuxt-link>
      <h2 class="heading__h2 font-bold">New service</h2>
    </div>
    <div class="flex flex-col justify-between gap-5">
      <div class="flex w-full flex-col gap-3">
        <label class="span__element" for="name"> Name* </label>
        <InputText
          type="text"
          v-model="name"
          class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
          :class="errorName && 'border-red-300'"
          @blur="handleChangeName"
        >
        </InputText>
        <p class="min-h-[20px]">
          <span v-show="errorName" class="text-[#D42F24] text-xs">{{
            errorName
          }}</span>
        </p>
      </div>
      <div class="flex w-full flex-col gap-3">
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
        <p class="min-h-[20px]">
          <span v-show="errorPrice" class="text-[#D42F24] text-xs">{{
            errorPrice
          }}</span>
        </p>
      </div>
    </div>
    <div class="card justify-content-center flex flex-col gap-3">
      <label class="span__element" for="description"> Description </label>
      <Textarea
        v-model="description"
        autoResize
        rows="3"
        cols="70"
        class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
        :class="errorDescription && 'border-red-300'"
        @blur="handleChangeDescription"
      />
      <p class="min-h-[20px]">
        <span v-show="errorDescription" class="text-[#D42F24] text-xs">{{
          errorDescription
        }}</span>
      </p>
    </div>
    <div class="card justify-content-center flex flex-col gap-3">
      <label class="span__element" for="notes"> Notes </label>
      <Textarea
        v-model="notes"
        autoResize
        rows="3"
        cols="70"
        class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
        :class="errorNotes && 'border-red-300'"
        @blur="handleChangeNote"
      />
      <p class="min-h-[20px]">
        <span v-show="errorNotes" class="text-[#D42F24] text-xs">{{
          errorNotes
        }}</span>
      </p>
    </div>
    <div class="card justify-content-center flex flex-col gap-3">
      <label class="span__element" for="notes"> Is Available? </label>
      <InputSwitch v-model="isAvailable" />
    </div>
    <div class="mt-10 flex flex-col gap-2 max-h-[150px] overflow-y-auto">
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
    <div class="flex justify-end gap-5">
      <Button
        label="Cancel"
        severity="secondary"
        outlined
        class="hover:shadow-xl"
      />
      <Button
        label="Submit"
        class="!bg-[#0291BF] text-white hover:shadow-xl"
        @click="service ? updateService() : createService()"
      />
    </div>
  </form>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useServiceStore } from "~/stores/services";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});

const router = useRouter();
const toast = useToast();
const serviceStore = useServiceStore();
const { useRequired, useValidateTextArea } = useValidation();

const isAvailable = ref(true);
const notes = ref("");
const name = ref("");
const description = ref("");
const price = ref(1.0);
const subservice = ref("");
const subservices = ref([]);
const showSubserviceInput = ref(false);

const errorName = ref("");
const errorNotes = ref("");
const errorDescription = ref("");
const errorPrice = ref("");
const errorSubservice = ref("");

const handleChangeName = () => {
  errorName.value = useRequired({
    fieldname: "Name",
    field: name.value,
    error: errorName.value,
  });
};
const handleChangePrice = () => {
  errorPrice.value = useRequired({
    fieldname: "Price",
    field: price.value,
    error: errorPrice.value,
  });
};
const handleChangeDescription = () => {
  errorDescription.value = useValidateTextArea({
    field: description.value,
    error: errorDescription.value,
  });
};
const handleChangeNote = () => {
  errorNotes.value = useValidateTextArea({
    field: notes.value,
    error: errorNotes.value,
  });
};
const handleChangeSubservice = () => {
  errorSubservice.value = useRequired({
    fieldname: "Subservices",
    field: subservice.value,
    error: errorSubservice.value,
  });
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
      toast.add({
        severity: "success",
        summary: "Service",
        detail: "Service created successfully",
        life: 5000,
      });
      router.push("/products");
    } catch (error) {
      toast.add({
        severity: "error",
        summary: "Service",
        detail: `An error has occurred.`,
        life: 5000,
      });
    }
  }
};
</script>
