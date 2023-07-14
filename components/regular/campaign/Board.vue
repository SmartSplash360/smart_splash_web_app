<template>
  <div class="lg:flex w-full items-start justify-between sm:items-center flex-wrap gap-5">
    <div class="flex flex-col items-end gap-5 lg:gap-32 sm:flex-row sm:justify-between">
      <div class="card flex w-full justify-center sm:w-fit b">
        <Dropdown
          @change="$emit('selectStatus', status)"
          v-model="status"
          :options="statuses"
          optionLabel="state"
          placeholder="Email Campaign"
          class="w-full md:w-52 dark:bg-[#1B2028]"
        />
      </div>
      <BaseSearchBar class="w-full -order-1 lg:order-1"></BaseSearchBar>
    </div>
    <div class="flex-1 flex justify-end mt-5 lg:mt-0">
      <BaseAddButton
      :btnText="'Template'"
      @click="createTemplate"
      class="hover:shadow-xl"
    ></BaseAddButton>
    </div>
  </div>
</template>

<script setup>

const statuses = ref([
  { state : 'Email Campaign'},
  {state : 'Email Campaign 2'}
])

const status = ref();
const router = useRouter()
const createTemplate = () => router.push('campaigns/create-campaign')
</script>
