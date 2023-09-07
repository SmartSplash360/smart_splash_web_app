<template>
  <div
    @click="toggleNotificationModal"
    class="flex justify-center lg:fixed lg:bottom-0 lg:left-0 lg:right-0 lg:top-0 lg:z-[1200] lg:justify-normal lg:bg-[#0000000f]"
  >
    <div
      @click.stop=""
      class="absolute flex min-w-full flex-col gap-14 rounded-md bg-white p-4 lg:mr-64 lg:mt-28 lg:h-[465px] lg:min-w-[364px] lg:gap-5 -right-4 -top-7"
    >
      <div class="flex justify-between w-full bg-[#d4ecf4] p-3 rounded-md">
        <span class="bg-white p-3 w-1/2 rounded-md flex-center">All</span>
        <span class="w-1/2 rounded-md flex-center">Unread</span>
      </div>
      <div class="flex gap-5 border rounded-md p-2">
        <div>Img</div>
        <div class="flex flex-col justify-between p-2">
          <div class="flex items-center gap-2">
            <span class="span__element">Shawn DeVries:</span>
            <span class="span__element text-gray-500"
              >Set an Alert for A.J Beson.</span
            >
          </div>
          <span class="text-[#015D7B] span__element font-medium"
            >PSI Trending Alert</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  toggleNotificationModal: Function,
});

onMounted(() => {});
</script>
