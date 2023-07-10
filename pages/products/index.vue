<template>
  <ContainerProductsList 
    :loading="loading" >
  </ContainerProductsList>
</template>

<script setup>
import { useProductStore} from "~/stores/products";
import { useServiceStore} from "~/stores/services";

const loading = ref(true);

const productStore = useProductStore();
const serviceStore = useServiceStore();

onMounted(async () => {
  await productStore.fetchProducts();
  await serviceStore.fetchServices();
  loading.value = false
});

definePageMeta({
  layout: "dashboard",
  middleware: 'auth',
});

</script>
