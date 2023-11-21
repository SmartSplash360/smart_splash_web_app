<template>
  <main class="flex md:h-[100vh] w-full md:items-center py-10 md:py-0">
    <ContainerAuthSignupForm class="h-full w-full lg:w-3/5">
    </ContainerAuthSignupForm>
  </main>
</template>

<script setup>
definePageMeta({
  layout: "",
  middleware: ["auth-redirect"],
});
</script>
