<template>
    <main class="flex md:min-h-[100vh] w-full md:items-center py-10 md:py-0">
      <div 
        class="w-full  sm:mx-auto 
        max-w-4xl
          px-5 sm:px-0 flex-between gap-0 
          rounded-md bg-white lg:min-h-[730px]
          lg:border lg:shadow-lg 
          lg:hover:shadow-xl">
        <ContainerTenantsRegisterForm 
          class="h-full w-full">
        </ContainerTenantsRegisterForm>
      </div>
    </main>
  </template>
  
  <script setup>
  definePageMeta({
    layout: "",
  });
  </script>
  