<template>

  <div class="w-4/5 flex justify-between rounded-xl bg-[#d4ecf4] px-5 py-2 flex-wrap  items-center dark:bg-[#1B2028] dark:text-white">
  <BaseActivityInfoItem
      :icon="ActiveRouteIcon"
      :alt="'active-route-icon'"
      :status="'Active (routed)'"
      :count="routes.activeRoute"
      :loading="loading"
  ></BaseActivityInfoItem>
  <BaseActivityInfoItem
      :icon="ActiveNoRoute"
      :alt="'active-no-route'"
      :status="'Active (no route)'"
      :count="routes.activeNoRoute"
      :loading="loading"
  ></BaseActivityInfoItem>
  <BaseActivityInfoItem
      :icon="InactiveRoute"
      :alt="'inactive-route'"
      :status="'Inactive'"
      :count="routes.inactive"
      :loading="loading"
  ></BaseActivityInfoItem>
  <BaseActivityInfoItem
      :icon="LeadsIcon"
      :alt="'lead-route'"
      :status="'Leads'"
      :count="routes.leads"
      :loading="loading"
  ></BaseActivityInfoItem>
  </div>
</template>
  
  <script setup>
  import ActiveRouteIcon from "@/assets/icons/desktopActiveRoute.svg";
  import ActiveNoRoute from "@/assets/icons/DesktopActiveNoRoute.svg";
  import InactiveRoute from "@/assets/icons/DesktopInactiveRoute.svg";
  import LeadsIcon from "@/assets/icons/DesktopLeads.svg";

  
  defineProps({
    routes: Object,
    loading: Boolean,
  });
  </script>
  