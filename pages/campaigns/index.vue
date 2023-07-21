<template>
    <ContainerCampaignList></ContainerCampaignList>
</template>

<script setup>
import { useTemplateStore} from '@/stores/templates'
definePageMeta({
  layout: "dashboard",
  middleware: ['auth','auto-theme'],
});

const store = useTemplateStore();
const loading = ref(true)

onMounted(async () => {
  await store.fetchTemplates();
  loading.value = false
});

</script>
