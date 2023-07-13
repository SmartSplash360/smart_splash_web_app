<template>
  <BaseActivityCard
      :icon="ActiveRouteIcon"
      :alt="'active-route-icon'"
      :status="'Active (routed)'"
      :count="routes.activeRoute"
      :loading="loading"
      :bg="'primary'"
  ></BaseActivityCard>
  <BaseActivityCard
      :icon="ActiveNoRoute"
      :alt="'active-no-route'"
      :status="'Active (no route)'"
      :count="routes.activeNoRoute"
      :loading="loading"
  ></BaseActivityCard>
  <BaseActivityCard
      :icon="InactiveRoute"
      :alt="'inactive-route'"
      :status="'Inactive'"
      :count="routes.inactive"
      :loading="loading"
      :bg="'primary'"
  ></BaseActivityCard>
  <BaseActivityCard v-if="showLeads"
                    :icon="Leads"
                    :alt="'user-leads-icons'"
                    :status="'Leads'"
                    :count="routes.leads"
                    :loading="loading"
                    :isLead="true"
  ></BaseActivityCard>
</template>

<script setup>
import ActiveRouteIcon from "@/assets/icons/people-switch.svg";
import ActiveNoRoute from "@/assets/icons/ic_baseline-people.svg";
import InactiveRoute from "@/assets/icons/inactive-users.svg";
import Leads from "@/assets/icons/users-leads.svg";
import BaseActivityCard from "~/components/base/BaseActivityCard.vue";

defineProps({
  routes: Object,
  loading: Boolean,
  showLeads: {
    type: Boolean,
    default: true,
  }
});
</script>
