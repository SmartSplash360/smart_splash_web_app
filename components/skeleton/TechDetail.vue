<template>
  <div class="mt-10 flex flex-col gap-10">
    <div class="flex items-center justify-between">
      <div
        role="status"
        class="w-full lg:w-1/4 animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0"
      >
        <div
          class="flex h-[4rem] w-[4rem]  md:w-[5rem] lg:w-[6rem] items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700"
        >
          <svg
            class="h-8 w-8 text-gray-100"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 640 512"
          >
            <path
              d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"
            />
          </svg>
        </div>
        <div class="w-full">
          <div
            class="mb-2 h-2 lg:w-1/2 rounded-full bg-gray-200 dark:bg-gray-700"
          ></div>
          <div
            class="mb-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700"
          ></div>
          <div
            class="mb-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700"
          ></div>
        </div>
      </div>
      <div role="status" class="w-full animate-pulse">
        <div
          class="ml-auto h-8 w-8 rounded-lg bg-gray-200 dark:bg-gray-700 sm:h-12 sm:w-64"
        ></div>

        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div role="status" class="w-full animate-pulse">
      <div class="hidden items-center gap-10 sm:flex">
        <div class="h-16 w-48 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
        <div class="h-16 w-48 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
        <div class="h-16 w-48 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
        <div class="h-16 w-48 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
    <div class="flex flex-col items-center justify-between gap-14 lg:flex-row">
      <div
        role="status"
        class="h-full w-full max-w-full animate-pulse space-y-4 divide-y divide-gray-200 rounded border border-gray-200 p-4 shadow dark:divide-gray-700 dark:border-gray-700 md:p-6"
      >
        <div class="flex items-center justify-between">
          <div>
            <div
              class="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"
            ></div>
            <div
              class="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"
            ></div>
          </div>
          <div
            class="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"
          ></div>
        </div>
        <div class="flex items-center justify-between pt-4">
          <div>
            <div
              class="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"
            ></div>
            <div
              class="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"
            ></div>
          </div>
          <div
            class="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"
          ></div>
        </div>
        <div class="flex items-center justify-between pt-4">
          <div>
            <div
              class="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"
            ></div>
            <div
              class="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"
            ></div>
          </div>
          <div
            class="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"
          ></div>
        </div>
        <div class="flex items-center justify-between pt-4">
          <div>
            <div
              class="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"
            ></div>
            <div
              class="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"
            ></div>
          </div>
          <div
            class="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"
          ></div>
        </div>
        <div class="flex items-center justify-between pt-4">
          <div>
            <div
              class="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"
            ></div>
            <div
              class="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"
            ></div>
          </div>
          <div
            class="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"
          ></div>
        </div>
        <div class="flex items-center justify-between pt-4">
          <div>
            <div
              class="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"
            ></div>
            <div
              class="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"
            ></div>
          </div>
          <div
            class="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"
          ></div>
        </div>
        <div class="flex items-center justify-between pt-4">
          <div>
            <div
              class="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"
            ></div>
            <div
              class="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"
            ></div>
          </div>
          <div
            class="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"
          ></div>
        </div>
        <div class="flex items-center justify-between pt-4">
          <div>
            <div
              class="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"
            ></div>
            <div
              class="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"
            ></div>
          </div>
          <div
            class="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"
          ></div>
        </div>
        <div class="flex items-center justify-between pt-4">
          <div>
            <div
              class="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"
            ></div>
            <div
              class="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"
            ></div>
          </div>
          <div
            class="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"
          ></div>
        </div>
        <div class="flex items-center justify-between pt-4">
          <div>
            <div
              class="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"
            ></div>
            <div
              class="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"
            ></div>
          </div>
          <div
            class="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
