<template>
  <ContainerReportQuotes> </ContainerReportQuotes>
</template>

<script setup>
import { useQuoteStore } from "@/stores/quote";

const store = useQuoteStore();

onMounted(async () => {
  await store.fetchQuotes();
});

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});
</script>
