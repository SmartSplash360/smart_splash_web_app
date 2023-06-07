<template>
  <div
    class="flex min-h-[80px] w-full items-center justify-between px-10 shadow-md"
  >
    <p class="flex items-baseline gap-2 text-[22px] font-[600] leading-8">
      <span class="inline-flex h-[30px] w-[30px] items-center justify-center"
        ><font-awesome-icon :icon="['fas', 'user-group']"
      /></span>
      <span>Customer</span>
    </p>
    <div class="ml-auto flex w-2/5 items-center justify-between">
      <BaseSearchBar></BaseSearchBar>
      <div class="flex items-center justify-between gap-4">
        <span class="inline-flex h-[60px] w-[60px] items-center justify-center"
          ><font-awesome-icon :icon="['far', 'bell']" class="text-2xl"
        /></span>
        <span class="text-[16px] leading-6">Josh Greg</span>
        <div class="flex items-center gap-2">
          <div class="h-[50px] w-[50px] rounded-full">
            <img
              :src="userProfile"
              alt="user-profile"
              class="h-full w-full rounded-full"
            />
          </div>
          <span
            class="inline-flex h-[16px] w-[16px] items-center justify-center"
          >
            <font-awesome-icon :icon="['fas', 'chevron-down']" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import userProfile from "../../assets/images/profile_user.jpg";
</script>

<style lang="scss" scoped></style>
