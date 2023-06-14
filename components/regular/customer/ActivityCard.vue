<template>
  <div
    class="flex max-h-[80px] w-full cursor-pointer items-center gap-5 rounded-xl bg-[#0291BF] px-3 py-2 sm:w-[120px] sm:justify-between sm:gap-2 lg:max-w-[120px] xl:h-[80px] xl:w-[230px] xl:max-w-[250px] xl:gap-0"
  >
    <span class="h-[45px] w-[45px]">
      <img
        :src="ActiveRouteIcon"
        alt="active-route-icon"
        class="h-full w-full"
      />
    </span>
    <div
      class="flex w-full items-center justify-between text-white sm:flex-col sm:gap-3"
    >
      <span class="text-xs font-[300] leading-6 xl:text-lg"
        >Active (routed)</span
      >
      <span class="text-sm font-[600] xl:text-[18px]">131</span>
    </div>
  </div>
  <div
    class="flex max-h-[80px] w-full cursor-pointer items-center gap-5 rounded-xl bg-[#E9E9E9] px-3 py-2 sm:w-[120px] sm:justify-center sm:gap-2 lg:max-w-[120px] xl:h-[80px] xl:w-[230px] xl:max-w-[250px] xl:gap-0"
  >
    <span class="flex h-[40px] w-[40px] items-center justify-center">
      <img :src="ActiveNoRoute" alt="active-no-route" />
    </span>
    <div
      class="flex w-full items-center justify-between text-black sm:flex-col sm:gap-3"
    >
      <span class="text-xs font-[300] leading-6 xl:text-lg"
        >Active (no route)</span
      >
      <span class="text-sm font-[600] xl:text-[18px]">41</span>
    </div>
  </div>
  <div
    class="flex max-h-[80px] w-full cursor-pointer items-center gap-5 rounded-xl bg-[#0291BF] px-3 py-2 sm:w-[120px] sm:justify-center sm:gap-2 lg:max-w-[120px] xl:h-[80px] xl:w-[230px] xl:max-w-[250px] xl:gap-0"
  >
    <span class="flex h-[40px] w-[40px] items-center justify-center">
      <img :src="InactiveRoute" alt="inactive-route" />
    </span>
    <div
      class="flex w-full items-center justify-between text-white sm:flex-col sm:gap-3"
    >
      <span class="text-xs font-[300] leading-6 xl:text-lg">Inactive</span>
      <span class="text-sm font-[600] xl:text-[18px]">56</span>
    </div>
  </div>
  <div
    class="flex max-h-[80px] w-full cursor-pointer items-center gap-5 rounded-xl bg-[#E9E9E9] px-3 py-2 sm:w-[120px] sm:justify-center sm:gap-2 lg:max-w-[120px] xl:h-[80px] xl:w-[230px] xl:max-w-[250px] xl:gap-0"
  >
    <span class="flex h-[40px] w-[40px] items-center justify-center">
      <img :src="Leads" alt="user-leads-icons" />
    </span>
    <div
      @click="toggleCustomerView"
      class="flex w-full items-center justify-between text-black sm:flex-col sm:gap-3"
    >
      <span class="text-xs font-[300] leading-6 xl:text-lg">Leads</span>
      <span class="text-sm font-[600] xl:text-[18px]">0</span>
    </div>
  </div>
</template>

<script setup>
import ActiveRouteIcon from "@/assets/icons/people-switch.svg";
import ActiveNoRoute from "@/assets/icons/ic_baseline-people.svg";
import InactiveRoute from "@/assets/icons/inactive-users.svg";
import Leads from "@/assets/icons/users-leads.svg";
const { toggleCustomerView } = inject("customer-view");
</script>
