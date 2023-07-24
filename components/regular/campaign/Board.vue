<template>
  <div class="lg:flex w-full items-start justify-between sm:items-center flex-wrap gap-5">
    <div class="flex flex-col items-end gap-5 lg:gap-32 sm:flex-row sm:justify-between">
      <div class="card flex w-full justify-center sm:w-fit b">
        <Dropdown
          @change="$emit('select-type', type)"
          v-model="type"
          :options="types"
          optionLabel="state"
          optionValue="option"
          placeholder="Campaign Type"
          class="w-full md:w-52 dark:bg-[#1B2028]"
        />
      </div>
      <BaseSearchBar class="w-full min-w-[275px] -order-1 lg:order-1" 
        :value="searchQuery" 
        @handleSearch="value => searchTemplate(value)"></BaseSearchBar>
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
defineProps({
  searchQuery:String
})
const emit = defineEmits(['search-template', 'select-type'])

const types = ref([
  { state : 'All Campaign', option : 1},
  { state : 'Email Campaign', option : 2},
  {state : 'SMS Campaign', option : 3}
])
const type = ref(2);
const router = useRouter()

const searchTemplate = (value) =>  emit('search-template', value)

const createTemplate = () => router.push('campaigns/create-template')
</script>
