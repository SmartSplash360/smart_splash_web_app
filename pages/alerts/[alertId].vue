<template>
  <SkeletonEditMobilePages v-if="loading"></SkeletonEditMobilePages>
  <div
    v-else
    class="flex min-w-full flex-col gap-10 bg-white dark:bg-[#31353F]"
  >
    <div class="flex items-center gap-4 text-[#025E7C]">
      <nuxt-link to="/alerts">
        <font-awesome-icon icon="chevron-left" />
      </nuxt-link>
      <h2 class="heading__h2 font-bold">Details for Alert {{ alertId }}</h2>
    </div>
    <div class="flex flex-col gap-5" @click="toggleShowAlertInfo">
      <h4 class="heading__h4 font-bold text-[#025E7C]">{{ alert.subject }}</h4>
      <div class="border p-5 rounded-lg flex flex-col gap-4">
        <div class="flex justify-between">
          <span class="span__element text-[#015D7B]">#{{ alert.id }}</span>
          <span class="paragraph__p text-[#015D7B] font-bold">{{
            alert.body_of_water_id
          }}</span>
        </div>
        <p>
          <span class="span__element text-gray-600">Status : </span>
          <span class="span__element text-gray-400"> {{ alert.status }}</span>
        </p>
        <p>
          <span class="span__element text-gray-600">Priority : </span>
          <span class="span__element text-gray-400"> {{ alert.priority }}</span>
        </p>
        <p>
          <span class="span__element text-gray-600">Created at : </span>
          <span class="span__element text-gray-400">
            {{ alert.created_at }}</span
          >
        </p>
        <div class="flex flex-col gap-2 my-2">
          <span class="span__element text-gray-600 font-bold"
            >Technician info
          </span>
          <p>
            <span class="span__element text-xs text-gray-600"> Name : </span>
            <span class="span__element text-xs text-gray-400">
              {{ technician?.name }}</span
            >
          </p>
          <p>
            <span class="span__element text-xs text-gray-600"> Email : </span>
            <span class="span__element text-xs text-gray-400">
              {{ technician?.email }}</span
            >
          </p>
          <p>
            <span class="span__element text-xs text-gray-600"> Phone : </span>
            <span class="span__element text-xs text-gray-400">
              {{ technician?.phone_number }}</span
            >
          </p>
        </div>
        <div class="flex flex-col gap-2 my-2">
          <span class="span__element text-gray-600 font-bold"
            >Customer info
          </span>
          <p>
            <span class="span__element text-xs text-gray-600"> Name : </span>
            <span class="span__element text-xs text-gray-400">
              {{ customer?.name }}</span
            >
          </p>
          <p>
            <span class="span__element text-xs text-gray-600"> Email : </span>
            <span class="span__element text-xs text-gray-400">
              {{ customer?.email }}</span
            >
          </p>
        </div>
      </div>
    </div>
    <div class="mt-10 flex justify-end gap-5">
      <nuxt-link to="/alerts">
        <Button
          label="Return"
          severity="secondary"
          outlined
          class="hover:shadow-xl"
          @click="$router.back()"
        />
      </nuxt-link>
      <Button
        label="Create Job"
        class="!bg-[#0291BF] hover:shadow-xl text-white"
        @click="handleCreateJob()"
      />
    </div>
  </div>
</template>

<script setup>
import { useAlertStore } from "~/stores/alert";
import { useCustomerStore } from "~/stores/customer";
import { useTechnicianStore } from "~/stores/technician";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});

const alertStore = useAlertStore();
const customerStore = useCustomerStore();
const technicianStore = useTechnicianStore();

const router = useRouter();
const route = useRoute();
const alertId = route.query.alertId;
const technicianId = route.query.technicianId;
const customerId = route.query.customerId;

const alert = ref();
const customer = ref();
const technician = ref();
const loading = ref(true);

onMounted(async () => {
  alert.value = await alertStore.fetchAlert(alertId);
  technician.value = await technicianStore.getTechnicianById(
    parseInt(technicianId)
  );
  customer.value = await customerStore.getCustomerById(parseInt(customerId));
  loading.value = false;
});

const handleCreateJob = () => {
  router.push({
    path: "/jobs/create-technician-job",
    query: {
      technicianIdAlert: technicianId,
      customerIdAlert: customerId,
      poolIdAlert: alert.value.body_of_water_id,
    },
  });
};
</script>
