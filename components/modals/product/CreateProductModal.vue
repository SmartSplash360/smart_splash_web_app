<template>
  <div  @click="toggleAddProductModal( { show: false })"  class="fixed bottom-0 left-0 right-0 top-0 z-[1000] flex-center bg-[#000000da]">
      <form @click.stop  class="flex min-w-full flex-col gap-8 rounded-md bg-white p-10 lg:min-w-[950px] dark:bg-[#31353F] dark:text-white">
        <h2 class="heading__h2 font-bold text-[#025E7C]">
          {{ product ? 'Edit' : 'New' }} Product {{ product ? `#${product?.id}` : '' }}
        </h2>
        <div class="flex flex-col justify-between gap-5 sm:flex-row">
          <div class="flex w-full flex-col gap-3">
            <label class="span__element" for="name"> Name* </label>
            <InputText 
              type="text" 
              class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" 
              :class="errorName && 'border-red-300'" 
              v-model="name"
              @blur="handleChangeName">
            </InputText>
            <p class="min-h-[20px]">
              <span v-show="errorName" class="text-[#D42F24] text-xs">{{ errorName }}</span>
            </p>
          </div>
          <div class="flex w-full flex-col gap-3">
            <label class="span__element" for="name"> Price* </label>
            <InputNumber 
              class="dark:bg-[#1B2028] border-gray-300 rounded-md " 
              :class="errorPrice && 'border-red-300'" 
              v-model="price" 
              inputId="currency-us" 
              mode="currency" 
              currency="USD"
              locale="en-US"
              @blur="handleChangePrice">
            </InputNumber>
            <p class="min-h-[20px]">
              <span v-show="errorPrice" class="text-[#D42F24] text-xs">{{ errorPrice }}</span>
            </p>
          </div>
        </div>
        <div class="card justify-content-center flex flex-col gap-3">
          <label class="span__element" for="description"> Description (10 to 300 characters) </label>
          <Textarea 
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" 
            v-model="description" 
            autoResize 
            rows="3" 
            cols="70"
            :class="errorDescription && 'border-red-300'"
            @blur="handleChangeDescription"/>
            <p class="min-h-[20px]">
              <span v-show="errorDescription" class="text-[#D42F24] text-xs">{{ errorDescription }}</span>
            </p>
        </div>
        <div class="card justify-content-center flex flex-col gap-3">
          <label class="span__element" for="notes"> Notes (10 to 300 characters)</label>
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
            <span v-show="errorNotes" class="text-[#D42F24] text-xs">{{ errorNotes }}</span>
          </p>
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
            class="!bg-[#0291BF] hover:shadow-xl text-white"
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
const errorNotes = ref("");

const name = ref("");
const errorName = ref("");

const description = ref("");
const errorDescription = ref("");

const price = ref(1.00);
const errorPrice = ref("");


const handleChangeName = (event) => {
  const value = event.target.value
  if(!value){
    errorName.value = 'The name field is required';
  } else {
    errorName.value = '';
  }
}
const handleChangeDescription = (event) => {
  const value = event.target.value
  if(!value){
    errorDescription.value = 'The description field is required'
  } else if(description.value.length > 300){
    errorDescription.value = 'Please enter between 10 and 100 maximum characters'
  } else {
    errorDescription.value = '';
  }
}
const handleChangePrice = (event) => {
  const value = event.target.value
  if(!value){
    errorPrice.value = 'The price field is required';
  } else {
    errorPrice.value = '';
  }
}
const handleChangeNote = () => {
  if(!notes.value){
    errorNotes.value = 'The note field is required'
  } else if(notes.value.length > 100){
    errorNotes.value = 'Please enter between 10 and 100 maximum characters';
  } else {
    errorNotes.value = '';
  }
}

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
  if(!name.value){
    errorName.value = 'The name field is required';
    return
  } else if(!description.value){
    errorDescription.value = 'The description field is required';
    return
  } else if(!price.value ){
    errorPrice.value = 'The price field is required';
    return
  } else if(!notes.value){
    errorNotes.value = 'Please add a note'
    return 
  } else if( notes.value.length > 300){
    errorNotes.value = 'Please provide between 10 and 300 characters for notes'
    return 
  }
  try {
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