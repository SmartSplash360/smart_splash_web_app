<template>
  <main class="flex md:min-h-[100vh] w-full md:items-center py-10 md:py-0">
    <div
      class="w-full sm:mx-auto max-w-4xl py-5 px-5 flex-between gap-0 rounded-md bg-white lg:min-h-[730px] lg:border lg:shadow-lg lg:hover:shadow-xl"
    >
      <ContainerTenantsRegisterForm :user="user" class="h-full w-full">
      </ContainerTenantsRegisterForm>
    </div>
  </main>
</template>

<script setup>
import { useUserStore } from "~/stores/users";
definePageMeta({
  layout: "",
});

const store = useUserStore();
const user = ref();

onMounted(async () => {
  user.value = await store.getCurrentUser;
});
</script>
