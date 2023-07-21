<template>
  <div
      @click="toggleAddProductModal( { show: false })"
      class="fixed bottom-0 left-0 right-0 top-0 z-[1000] flex-center bg-[#000000da]"
  >
      <form
      @click.stop
          class="flex min-w-full flex-col gap-8 rounded-md bg-white p-10 lg:min-w-[950px] dark:bg-[#31353F] dark:text-white"
      >
        <h2 class="heading__h2 font-bold text-[#025E7C]">
          {{ product ? 'Edit' : 'New' }} Product {{ product ? `#${product?.id}` : '' }}
        </h2>
        <div class="flex flex-col justify-between gap-5 sm:flex-row">
          <div class="flex w-full flex-col gap-3">
            <label class="span__element" for="name"> Name* </label>
            <InputText type="text" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" v-model="name"></InputText>
          </div>
          <div class="flex w-full flex-col gap-3">
            <label class="span__element" for="name"> Price* </label>
            <InputNumber 
              class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" 
              v-model="price" 
              inputId="currency-us" 
              mode="currency" 
              currency="USD"
              locale="en-US">
            </InputNumber>
          </div>
        </div>

        <div class="card justify-content-center flex flex-col gap-3">
          <label class="span__element" for="description"> Description </label>
          <Textarea class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" v-model="description" autoResize rows="3" cols="70"/>
        </div>

        <div class="card justify-content-center flex flex-col gap-3">
          <label class="span__element" for="notes"> Notes </label>
          <Textarea class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" v-model="notes" autoResize rows="3" cols="70"/>
        </div>

        <div class="card justify-content-center flex flex-col gap-3">
          <label class="span__element" for="notes"> Is Available? </label>
          <InputSwitch  v-model="isAvailable"/>
        </div>

        <div class="mt-5 flex flex-col justify-end gap-5 sm:flex-row">
          <Button
              label="Cancel"
              severity="secondary"
              outlined
              @click="toggleAddProductModal( { show: false })"
              class="hover:shadow-xl dark:bg-[#1B2028] dark:text-white"
          />        
          <Button
            label="Submit"
            icon="pi pi-check"
            class="!bg-[#0291BF] hover:shadow-xl"
            @click="product ? updateProduct() : createProduct() "
          />
        </div>
      </form>
  </div>
</template>

<script setup>
import {useProductStore} from "~/stores/products";

const props = defineProps({
  toggleAddProductModal: Function,
  product: {
    type: Object,
    default: () => null,
    required: false,
  },
});

const productStore = useProductStore();

const isAvailable = ref(true);
const notes = ref("");
const name = ref("");
const description = ref("");
const price = ref(1.00);

onMounted(() => {
  if (props.product) {
    isAvailable.value = props.product.is_available === 1;
    notes.value = props.product.notes;
    name.value = props.product.name;
    description.value = props.product.description;
    price.value = props.product.price;
  }
})

const createProduct = async () => {
  try {
    // TODO: validation
    const data = {
      name: name.value,
      description: description.value,
      price: price.value,
      notes: notes.value,
      is_available: isAvailable.value,
    }

    await productStore.createProduct(data);
    await productStore.fetchProducts();

    props.toggleAddProductModal({success: "Product created successfully"});
  } catch (e) {
    props.toggleAddProductModal({error: e});
  }
}

const updateProduct = async () => {
  // TODO: validation
  try {
    const data = {
      name: name.value,
      description: description.value,
      price: price.value,
      notes: notes.value,
      is_available: isAvailable.value,
    };

    await productStore.updateProduct(props.product?.id, data);
    await productStore.fetchProducts();

    props.toggleAddProductModal({success: `Product ${props.product?.id} updated successfully`});
  } catch (e) {
    props.toggleAddProductModal({error: e})
  }
}
</script>

<style lang="scss" scoped></style>