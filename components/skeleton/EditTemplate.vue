<template>
  <div class="mt-10 flex flex-col gap-8">
    <div class="flex flex-col justify-between gap-10 py-5">
      <div role="status" class="flex flex-col gap-2 animate-pulse">
        <div
          class="p-6 flex flex-col lg:flex-row justify-between lg:items-center mb-2.5 h-20 w-full rounded-lg bg-gray-100 dark:bg-gray-500"
        ></div>
        <div
          class="p-6 flex flex-col lg:flex-row justify-between lg:items-center mb-2.5 h-10 w-full rounded-lg bg-gray-100 dark:bg-gray-500"
        ></div>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div
      role="status"
      class="min-h-64 h-72 max-w-full animate-pulse rounded border border-gray-200 p-4 shadow dark:divide-gray-700 dark:border-gray-700 md:p-6"
    >
      <span class="sr-only">Loading...</span>
    </div>
    <div role="status" class="flex flex-col gap-2 animate-pulse">
      <div
        class="mb-2.5 self-end h-10 w-32 rounded-lg bg-gray-100 dark:bg-gray-500"
      ></div>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>
