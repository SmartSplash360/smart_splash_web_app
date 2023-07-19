<template>
  <main class="flex h-[100vh] w-full items-center py-20 sm:p-0">
    <div
      class="mx-auto flex h-full w-full items-center justify-between gap-0 rounded-md lg:pl-5 sm:h-[730px] sm:w-3/4  lg:w-2/3 sm:border sm:hover:shadow-xl lg:shadow-lg"
    >
      <container-auth-signin-form
          class="h-full w-full lg:w-3/5"
      ></container-auth-signin-form>
      <container-auth-hero-logger
          class="hidden h-full lg:block lg:w-2/5"
          :login="true"
      ></container-auth-hero-logger>
    </div>
  </main>
</template>
<script>
definePageMeta({
  layout : ""
})
</script>

