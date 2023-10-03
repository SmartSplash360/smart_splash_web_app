<template>
  <div
    @click="toggleShowAlertInfo"
    class="fixed bottom-0 left-0 right-0 top-0 z-[1000] flex-center bg-[#000000da]"
  >
    <form
      @click.stop
      class="flex min-w-full flex-col gap-8 rounded-md bg-white p-10 lg:min-w-[550px] lg:max-h-[100vh] dark:bg-[#31353F] overflow-y-auto"
    >
      <div class="flex flex-col gap-5" @click="toggleShowAlertInfo">
        <h4 class="heading__h4 font-bold text-[#025E7C]">
          {{ alert.subject }}
        </h4>
        <div class="border p-5 rounded-lg flex flex-col gap-4">
          <div class="flex justify-between">
            <span class="span__element text-[#015D7B]">#{{ alert.id }}</span>
            <span class="paragraph__p text-[#015D7B] font-bold">{{
              alert.body_of_water.name
            }}</span>
          </div>
          <p>
            <span class="span__element text-gray-600">Adrress : </span>
            <span class="span__element text-gray-400">
              {{ alert.body_of_water.address }}</span
            >
          </p>
          <p>
            <span class="span__element text-gray-600">Status : </span>
            <span class="span__element text-gray-400"> {{ alert.status }}</span>
          </p>
          <p>
            <span class="span__element text-gray-600">Priority : </span>
            <span class="span__element text-gray-400">
              {{ alert.priority }}</span
            >
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
                {{ alert?.technician.name }}</span
              >
            </p>
            <p>
              <span class="span__element text-xs text-gray-600"> Email : </span>
              <span class="span__element text-xs text-gray-400">
                {{ alert?.technician.email }}</span
              >
            </p>
            <p>
              <span class="span__element text-xs text-gray-600"> Phone : </span>
              <span class="span__element text-xs text-gray-400">
                {{ alert?.technician.phone_number }}</span
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
                {{ alert?.body_of_water.customer.name }}</span
              >
            </p>
            <p>
              <span class="span__element text-xs text-gray-600"> Email : </span>
              <span class="span__element text-xs text-gray-400">
                {{ alert?.body_of_water.customer.email }}</span
              >
            </p>
          </div>
        </div>
      </div>
      <div class="mt-5 flex justify-end gap-5 sm:flex-row">
        <Button label="Cancel" @click="toggleShowAlertInfo" />
        <Button
          icon="pi pi-plus"
          label="Add Job"
          class="!bg-[#0291BF] hover:shadow-xl text-white"
          @click="handleCreateJob"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
const router = useRouter();
const props = defineProps({
  alert: Object,
  toggleShowAlertInfo: Function,
});

const { id, technician_id, body_of_water } = props.alert;

const handleCreateJob = () => {
  router.push({
    path: "/jobs/create-technician-job",
    query: {
      alertId: id,
      technicianIdAlert: technician_id,
      customerIdAlert: body_of_water.customer_id,
      poolIdAlert: body_of_water.id,
    },
  });
};
</script>
