<template>
  <main class="flex h-[100vh] items-center">
    <div
      class="mx-auto flex h-[730px] items-center justify-between gap-0 rounded-md border bg-white shadow-lg hover:shadow-xl lg:w-2/3"
    >
      <container-signinForm class="h-full w-3/5"></container-signinForm>
      <container-heroLogger
        class="h-full w-2/5"
        :login="true"
      ></container-heroLogger>
    </div>
  </main>
</template>
