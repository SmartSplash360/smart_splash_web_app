<template>
  <BaseActivityCard
    :icon="ActiveRouteIcon"
    :alt="'active-route-icon'"
    :status="'Active (routed)'"
    :count="131"
    :bg="'primary'"
  ></BaseActivityCard>
  <BaseActivityCard
    :icon="ActiveNoRoute"
    :alt="'active-no-route'"
    :status="'Active (no route)'"
    :count="41"
  ></BaseActivityCard>
  <BaseActivityCard
    :icon="InactiveRoute"
    :alt="'inactive-route'"
    :status="'Inactive'"
    :count="56"
    :bg="'primary'"
  ></BaseActivityCard>
  <BaseActivityCard
    :icon="Leads"
    :alt="'user-leads-icons'"
    :status="'Leads'"
    :count="0"
    :isLead="true"
  ></BaseActivityCard>
</template>

<script setup>
import ActiveRouteIcon from "@/assets/icons/people-switch.svg";
import ActiveNoRoute from "@/assets/icons/ic_baseline-people.svg";
import InactiveRoute from "@/assets/icons/inactive-users.svg";
import Leads from "@/assets/icons/users-leads.svg";
import BaseActivityCard from "~/components/base/BaseActivityCard.vue";
</script>
