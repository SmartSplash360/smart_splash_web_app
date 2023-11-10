<template>
  <form
    class="flex min-w-full flex-col gap-5 rounded-md bg-white dark:bg-[#31353F] dark:text-white"
  >
    <div class="flex items-center gap-4 text-[#025E7C] mb-4">
      <nuxt-link to="/products">
        <font-awesome-icon icon="chevron-left" />
      </nuxt-link>
      <h2 class="heading__h2 font-bold">New Product</h2>
    </div>
    <div class="flex flex-col justify-between gap-2">
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
        class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
        v-model="description"
        autoResize
        rows="3"
        cols="70"
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
        class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
        v-model="notes"
        autoResize
        rows="3"
        cols="70"
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
    <div class="flex justify-end gap-5">
      <Button
        label="Cancel"
        severity="secondary"
        outlined
        class="hover:shadow-xl dark:bg-[#1B2028] dark:text-white"
        @click="cancel()"
      />
      <Button
        label="Create Product"
        class="!bg-[#0291BF] text-white hover:shadow-xl"
        @click="createProduct()"
      />
    </div>
  </form>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useProductStore } from "~/stores/products";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});

const router = useRouter();
const toast = useToast();
const productStore = useProductStore();
const { useRequired, useValidateTextArea } = useValidation();

const isAvailable = ref(true);
const notes = ref("");
const name = ref("");
const description = ref("");
const price = ref(1.0);

const errorName = ref("");
const errorNotes = ref("");
const errorDescription = ref("");
const errorPrice = ref("");

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
const createProduct = async () => {
  if (validateForm()) {
    try {
      await productStore.createProduct({
        name: name.value,
        description: description.value,
        price: price.value,
        notes: notes.value,
        is_available: isAvailable.value,
      });
      await productStore.fetchProducts();
      toast.add({
        severity: "success",
        summary: "Product",
        detail: "Product created successfully",
        life: 5000,
      });
      router.push("/products");
    } catch (error) {
      toast.add({
        severity: "error",
        summary: "Product",
        detail: `An error has occurred: ${error}`,
        life: 5000,
      });
    }
  }
};
const cancel = () => {
  router.push("/products");
};
</script>
