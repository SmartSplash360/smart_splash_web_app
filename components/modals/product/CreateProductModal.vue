<template>
  <div
      class="fixed bottom-0 left-0 right-0 top-0 z-[1000] flex items-center justify-center bg-[#000000da]"
  >
    <div class="flex min-h-[500px] gap-2 rounded-md sm:gap-5">
      <form
          class="flex min-w-full flex-col gap-8 rounded-md bg-white p-10 lg:min-w-[950px]"
      >
        <h3 class="text-[25px] font-[700] leading-[38px] text-[#025E7C]">
          New Product
        </h3>
        <div class="flex flex-col justify-between gap-5 sm:flex-row">
          <div class="flex w-full flex-col gap-3">
            <label for="name"> Name* </label>
            <InputText type="text" v-model="name"></InputText>
          </div>
          <div class="flex w-full flex-col gap-3">
            <label for="name"> Price* </label>
            <InputNumber v-model="price" inputId="currency-us" mode="currency" currency="USD"
                         locale="en-US"></InputNumber>
          </div>
        </div>

        <div class="card justify-content-center flex flex-col gap-3">
          <label for="description"> Description </label>
          <Textarea v-model="description" autoResize rows="3" cols="70"/>
        </div>

        <div class="card justify-content-center flex flex-col gap-3">
          <label for="notes"> Notes </label>
          <Textarea v-model="notes" autoResize rows="3" cols="70"/>
        </div>

        <div class="card justify-content-center flex flex-col gap-3">
          <label for="notes"> Is Available? </label>
          <InputSwitch v-model="isAvailable"/>
        </div>

        <div class="mt-5 flex flex-col justify-end gap-5 sm:flex-row">
          <Button
              label="Cancel"
              severity="secondary"
              outlined
              @click="toggleAddProductModal( { show: false })"
              class="hover:shadow-xl"
          />
          <Button label="Submit" icon="pi pi-check" @click="createProduct"/>
        </div>
      </form>
      <div
          @click="toggleAddProductModal"
          class="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-white sm:h-8 sm:w-8"
      >
        x
      </div>
    </div>
  </div>
</template>

<script setup>
import {useProductStore} from "~/stores/products";

const props = defineProps({
  toggleAddProductModal: Function,
});

const productStore = useProductStore();

const isAvailable = ref(true);
const notes = ref("");
const name = ref("");
const description = ref("");
const price = ref(1.00);

const createProduct = async () => {
  try {
    // TODO: validation

    await productStore.createProduct({
      name: name.value,
      description: description.value,
      price: price.value,
      notes: notes.value,
      is_available: isAvailable.value,
    });

    props.toggleAddProductModal({success: "Product created successfully"});
  } catch (e) {
    props.toggleAddProductModal({error: e});
  }
}
</script>

<style lang="scss" scoped></style>
