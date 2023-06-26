<template>
  <ContainerCustomerList v-if="customerView"></ContainerCustomerList>
  <ContainerCustomerLeads v-else></ContainerCustomerLeads>
</template>

<script setup>
import { useCustomerStore} from "~/stores/customer";
import { useUserStore} from "~/stores/users";

const userStore = useUserStore();
const store = useCustomerStore();
const customerView = ref(true);

onMounted(async () => {
  await store.fetchCustomers();
});

const toggleCustomerView = () => {
  customerView.value = !customerView.value;
};

provide("customer-view", {
  customerView,
  toggleCustomerView,
});

definePageMeta({
  layout: "dashboard",
});
</script>
