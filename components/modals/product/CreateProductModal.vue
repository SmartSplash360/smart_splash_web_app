<template>
  <div
      class="fixed bottom-0 left-0 right-0 top-0 z-[1000] flex items-center justify-center bg-[#000000da]"
  >
    <div class="flex min-h-[500px] gap-2 rounded-md sm:gap-5">
      <form
          class="flex min-w-full flex-col gap-8 rounded-md bg-white p-10 lg:min-w-[950px]"
      >
        <h3 class="text-[25px] font-[700] leading-[38px] text-[#025E7C]">
          {{ product ? 'Edit' : 'New' }} Product {{ product ? `#${product?.id}` : '' }}
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
          <Button label="Submit" icon="pi pi-check"
                  @click="product ? updateProduct() : createProduct() "/>
        </div>
      </form>
      <div
          @click="toggleAddProductModal( { show: false })"
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