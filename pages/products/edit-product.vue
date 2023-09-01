<template>
  <SkeletonEditMobilePages v-if="loading"></SkeletonEditMobilePages>
  <form
    v-else
    class="flex min-w-full flex-col gap-8 rounded-md bg-white dark:bg-[#31353F] dark:text-white"
  >
    <div class="flex items-center gap-4 text-[#025E7C]">
      <nuxt-link to="/products">
        <font-awesome-icon icon="chevron-left" />
      </nuxt-link>
      <h2 class="heading__h2 font-bold text-[#025E7C]">
        Edit Product {{ productId }}
      </h2>
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
        label="Edit Product"
        class="!bg-[#0291BF] text-white hover:shadow-xl"
        @click="updateProduct()"
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

const productStore = useProductStore();
const router = useRouter();
const route = useRoute();
const toast = useToast();
const productId = route.query.productId;

const isAvailable = ref(true);
const notes = ref("");
const name = ref("");
const description = ref("");
const price = ref(1.0);
const loading = ref(true);

const errorName = ref("");
const errorNotes = ref("");
const errorDescription = ref("");
const errorPrice = ref("");

onMounted(async () => {
  const product = await productStore.fetchProduct(productId);
  isAvailable.value = product.is_available === 1;
  notes.value = product.notes;
  name.value = product.name;
  description.value = product.description;
  price.value = product.price;
  loading.value = false;
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

      await productStore.updateProduct(productId, data);
      await productStore.fetchProducts();
      toast.add({
        severity: "success",
        summary: "Product",
        detail: "Product edited successfully",
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
