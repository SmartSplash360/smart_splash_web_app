<template>
  <div class="side-bar-container">
    <div class="h-[150px] bg-[#015d7b] p-5 lg:w-[298px]">
      <img
        :src="SmartPlashLogo"
        alt="Smart-Splash-Logo"
        class="h-full w-full"
      />
    </div>
    <div class="mt-20 px-5">
      <ul class="flex flex-col gap-10 text-white">
        <li
          class="flex cursor-pointer items-center gap-5 rounded-xl px-5 py-2 hover:bg-white"
        >
          <span
            class="inline-flex h-[16px] w-[16px] items-center justify-center text-xl"
            ><font-awesome-icon :icon="['fas', 'triangle-exclamation']"
          /></span>
          <span class="text-sm font-bold leading-7">Alerts</span>
        </li>
        <li
          class="flex cursor-pointer items-center gap-5 rounded-xl bg-white px-5 py-2 text-black transition-all ease-out"
        >
          <span
            class="inline-flex h-[16px] w-[16px] items-center justify-center text-xl"
            ><font-awesome-icon :icon="['fas', 'user-group']"
          /></span>
          <span class="text-sm font-bold leading-7">Customer</span>
        </li>
        <li
          class="flex cursor-pointer items-center gap-5 rounded-xl px-5 py-2 hover:bg-white"
        >
          <span
            class="inline-flex h-[16px] w-[16px] items-center justify-center text-xl"
          >
            <font-awesome-icon :icon="['fas', 'user-lock']" />
          </span>
          <span class="text-sm font-bold leading-7">Technicians</span>
        </li>
        <li
          class="flex cursor-pointer items-center gap-5 rounded-xl px-5 py-2 hover:bg-white"
        >
          <span
            class="inline-flex h-[16px] w-[16px] items-center justify-center text-xl"
            ><font-awesome-icon :icon="['fass', 'hand-holding']"
          /></span>
          <span class="text-sm font-bold leading-7">Product/Services</span>
        </li>
        <li
          class="flex cursor-pointer items-center gap-5 rounded-xl px-5 py-2 hover:bg-white"
        >
          <span
            class="inline-flex h-[16px] w-[16px] items-center justify-center text-xl"
            ><font-awesome-icon :icon="['fass', 'inbox']"
          /></span>
          <span class="text-sm font-bold leading-7">Inbox</span>
        </li>
        <li
          class="flex cursor-pointer items-center gap-5 rounded-xl px-5 py-2 hover:bg-white"
        >
          <span
            class="inline-flex h-[16px] w-[16px] items-center justify-center text-xl"
            ><font-awesome-icon :icon="['fass', 'file-chart-column']"
          /></span>
          <span class="text-sm font-bold leading-7">Reports</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import SmartPlashLogo from "../../assets/images/SmartSplash.png";
</script>

<style scoped>
.side-bar-container {
  background: linear-gradient(180deg, #015d7b 66.39%, rgba(1, 93, 123, 0) 100%);
  background-color: #015d7b;
}
</style>
