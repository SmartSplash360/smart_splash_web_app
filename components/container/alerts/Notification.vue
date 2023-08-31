<template>
  <section v-if="loading">
    <SkeletonEditTemplate></SkeletonEditTemplate>
  </section>
  <section v-else class="sm:gap-13  flex min-h-screen flex-col gap-8 ">
        <div class="w-full flex flex-col lg:flex-row gap-5 justify-between">
            <BaseSearchBar/>
            <Dropdown
                v-model="status"
                :options="statuses"
                placeholder="Show all"
                class="w-full md:w-56 dark:bg-[#1B2028]"
            />
        </div>
        <div>
            <div class="flex flex-col gap-10">
                <h4 class="heading__h4">Unresolved</h4>
                <ul class="flex flex-col gap-4">
                    <li class="flex flex-col gap-3 border rounded-xl p-5 border-l-[#0291BF] border-l-[24px]">
                        <div class="flex items-center gap-5">
                            <span>PSI trending down</span>
                            <span class="text-red-600">
                                <font-awesome-icon icon="triangle-exclamation" class="text-lg"/>
                            </span>
                        </div>
                        <div class="flex gap-4"> 
                            <span class="span__element">Last triggered</span>
                            <span class="span__element">28 min ago</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
  </section>
</template>

<script setup>
import { useToast } from "primevue/usetoast";

const toast = useToast();
const props = defineProps({
  loading: Boolean 
});
  const status = ref();
  const statuses = ref([ 'show All'
  ])

onMounted(async () => {

})


</script>
