<template>
  <BaseSearchBar class="w-11/12 self-center" />
  <ul
    class="flex flex-row overflow-x-auto overflow-y-hidden sm:flex-col sm:overflow-auto"
  >
    <li v-for="chat in chats" class="min-h-[180px] border-b">
      <div
        class="flex cursor-pointer items-center rounded-lg bg-[#D9D9D9] px-2 py-3 hover:bg-[#D9D9D9] sm:h-full sm:bg-white sm:p-0"
      >
        <img
          :src="chat.image"
          class="ml-5 h-[65px] w-[65px] rounded-full object-cover"
        />
        <div class="flex flex-col gap-2 px-5">
          <div class="flex w-full items-center justify-between">
            <h4 class="text-lg font-[500] text-gray-700">
              {{ chat.name }}
            </h4>
            <span class="text-xs text-gray-700"> {{ chat.time }} AM</span>
          </div>

          <span class="text-sm font-bold">
            {{ chat.subject }}
          </span>
          <span class="max-h-[60px] overflow-hidden text-ellipsis text-sm">
            {{ chat.message }}
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  chats: Array,
});
</script>

<style lang="scss" scoped></style>
