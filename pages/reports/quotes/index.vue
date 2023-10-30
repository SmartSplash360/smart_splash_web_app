<template>
  <ContainerReportQuotes :loading="loading"> </ContainerReportQuotes>
</template>

<script setup>
import { useQuoteStore } from "@/stores/quote";

const store = useQuoteStore();
const loading = ref(false);

onMounted(async () => {
  await store.fetchQuotes();
});

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});
</script>
