<template>
  <main class="md:h-[100vh] w-full py-10 md:py-0">
    <div
      class="w-full mx-auto p-5 lg:px-0 sm:mt-28 rounded-md bg-white sm:border sm:shadow-lg lg:hover:shadow-xl sm:w-3/4 lg:w-1/3 xl:w-1/3"
    >
      <ContainerAuthForgottenPassword></ContainerAuthForgottenPassword>
    </div>
  </main>
</template>
<script>
definePageMeta({
  layout: "",
  middleware: ["auth-redirect"],
});
</script>
