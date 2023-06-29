<template>
  <ContainerProductsList></ContainerProductsList>
</template>

<script setup>
import { useProductStore} from "~/stores/products";
import { useServiceStore} from "~/stores/services";

const productStore = useProductStore();
const serviceStore = useServiceStore();

onMounted(async () => {
  await productStore.fetchProducts();
  await serviceStore.fetchServices();
});

definePageMeta({
  layout: "dashboard",
  middleware: 'auth',
});

</script>
