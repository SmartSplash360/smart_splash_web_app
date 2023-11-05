<template>
  <SkeletonEditMobilePages v-if="loading"></SkeletonEditMobilePages>
  <form
    v-else
    class="flex min-h-[500px] flex-col gap-10 rounded-md bg-white dark:bg-[#31353F]"
  >
    <div class="flex justify-between items-center gap-4 text-[#025E7C]">
      <div
        class="w-fit flex gap-3 items-center cursor-pointer"
        @click="$router.back()"
      >
        <font-awesome-icon icon="chevron-left" />
      </div>
      <h2 class="heading__h2 font-bold">{{ userProfile }}'s Bodies of water</h2>
    </div>
    <RegularBodiesOfWaterTable :bodiesOfWater="bodiesOfWater" />
  </form>
</template>

<script setup>
import { useCustomerStore } from "~/stores/customer";
import { useBodyOfWaterStore } from "~/stores/bodyOfWater";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});

const customerStore = useCustomerStore();
const bodyOfWaterStore = useBodyOfWaterStore();
const bodiesOfWater = ref([]);

const route = useRoute();
const customerId = route.query.customerId;
const userProfile = route.query.userProfile;

const customer = ref();
const loading = ref(true);
const readOnly = ref(false);
const bodyOfWater = ref();

onMounted(() => {
  customer.value = customerStore.getCustomerById(parseInt(customerId));
  bodiesOfWater.value = customer.value?.bodies_of_water;
  loading.value = false;
});
</script>
