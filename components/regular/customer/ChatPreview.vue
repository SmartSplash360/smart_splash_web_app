<template>
  <div
    class="flex max-h-[130px] w-full flex-col gap-5 border-r sm:max-h-full sm:w-1/4 sm:pt-12"
  >
    <div class="flex w-full justify-center"><BaseSearchBar /></div>
    <ul
      class="flex flex-row gap-2 overflow-x-auto overflow-y-hidden sm:flex-col sm:overflow-auto"
    >
      <li v-for="chat in chats" class="min-h-[120px] border-b">
        <div
          class="flex cursor-pointer items-center gap-1 rounded-lg bg-[#D9D9D9] px-2 py-3 hover:bg-[#D9D9D9] sm:h-full sm:bg-white sm:p-0"
        >
          <div class="hidden px-5 sm:block">
            <Avatar
              :image="userProfile"
              class="mr-2"
              size="xlarge"
              shape="circle"
            />
          </div>
          <div class="flex sm:hidden">
            <Avatar
              :image="userProfile"
              class="mr-2"
              size="xmedium"
              shape="circle"
            />
          </div>
          <div class="flex w-full flex-col gap-6">
            <div class="flex w-full items-center justify-between">
              <h4 class="text-xs font-[500] leading-[15px] sm:text-[18px]">
                {{ chat.username }}
              </h4>
              <span
                class="self-start pr-5 text-[12px] font-[400] leading-[16px]"
                >9:44 PM</span
              >
            </div>
            <p class="hidden text-[14px] font-[400] leading-[16px] sm:flex">
              {{ chat.message }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import userProfile from "@/assets/images/profile_user.jpg";

const props = defineProps({
  chats: Array,
});
</script>

<style lang="scss" scoped></style>
