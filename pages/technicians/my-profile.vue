<template>
  <ContainerTechnicianOverview
    :technicianId="technicianId"
  ></ContainerTechnicianOverview>
</template>

<script setup>
import { useUserStore } from "~/stores/users";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});

const userStore = useUserStore();
const user = computed(() => userStore.getCurrentUser);
const technicianId = user.value.id.toString();
</script>
