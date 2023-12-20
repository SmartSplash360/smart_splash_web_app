<template>
  <main class="flex md:h-[100vh] w-full md:items-center py-10 md:py-0">
    <ContainerAuthSignupForm class="h-full w-full"> </ContainerAuthSignupForm>
  </main>
</template>

<script setup>
definePageMeta({
  layout: "",
  middleware: ["auth-redirect"],
});
</script>
