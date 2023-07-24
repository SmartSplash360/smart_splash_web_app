<template>
  <main class="flex md:h-[100vh] w-full md:items-center py-10 md:py-0">
    <div 
      class="w-full  sm:mx-auto  
        px-5 sm:px-0 flex-between gap-0 
        rounded-md bg-white lg:h-[600px] 
        lg:border lg:shadow-lg 
        lg:hover:shadow-xl  md:w-4/5 xl:w-[55%]">
      <ContainerAuthSigninForm
        class="h-full w-full lg:w-3/5"
      ></ContainerAuthSigninForm>
      <ContainerAuthHeroLogger
        class="hidden h-full lg:block lg:w-2/5"
        :login="true"
      ></ContainerAuthHeroLogger>
    </div>
  </main>
</template>
<script>

definePageMeta({
  layout : ""
})
</script>

