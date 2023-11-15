<template>
  <div
    @click="toggleAddProductModal({ show: false })"
    class="fixed bottom-0 left-0 right-0 top-0 z-[1000] flex-center bg-[#000000da]"
  >
    <form
      @click.stop
      class="flex min-w-full flex-col gap-8 rounded-md bg-white p-10 lg:min-w-[950px] dark:bg-[#31353F] dark:text-white"
    >
      <h2 class="heading__h2 font-bold text-[#025E7C]">
        {{ product ? "Edit" : "New" }} Product
        {{ product ? `#${product?.id}` : "" }}
      </h2>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
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
            class="dark:bg-[#1B2028] border-gray-300 rounded-md"
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
        <p class="min-h-[20px]">
          <span v-show="errorDescription" class="text-[#D42F24] text-xs">{{
            errorDescription
          }}</span>
        </p>
      </div>
      <div class="card justify-content-center flex flex-col gap-3">
        <label class="span__element" for="notes">
          Notes (10 to 300 characters)</label
        >
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
      <div class="mt-5 flex flex-col justify-end gap-5 sm:flex-row">
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          @click="toggleAddProductModal({ show: false })"
          class="hover:shadow-xl dark:bg-[#1B2028] dark:text-white"
        />
        <Button
          label="Submit"
          icon="pi pi-check"
          class="!bg-[#0291BF] hover:shadow-xl text-white"
          @click="product ? updateProduct() : createProduct()"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { useProductStore } from "~/stores/products";

const { toggleAddProductModal, product } = defineProps([
  "toggleAddProductModal",
  "product",
]);

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

onMounted(() => {
  if (product) {
    isAvailable.value = product.is_available === 1;
    notes.value = product.notes;
    name.value = product.name;
    description.value = product.description;
    price.value = product.price;
  }
});

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
      toggleAddProductModal({ success: "Product created successfully" });
      await productStore.fetchProducts();
    } catch (e) {
      toggleAddProductModal({ error: e });
    }
  }
};
const updateProduct = async () => {
  if (validateForm()) {
    try {
      const data = {
        name: name.value,
        description: description.value,
        price: price.value,
        notes: notes.value,
        is_available: isAvailable.value,
      };

      await productStore.updateProduct(product?.id, data);
      await productStore.fetchProducts();

      toggleAddProductModal({
        success: `Product ${product?.id} updated successfully`,
      });
    } catch (e) {
      toggleAddProductModal({ error: e });
    }
  }
};
</script>
