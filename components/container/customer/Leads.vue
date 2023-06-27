<template>
  <div
    class="flex max-h-[95vh] flex-col overflow-y-auto sm:flex-row lg:-mx-10 lg:-mt-10"
  >
    <div
      class="flex w-full flex-col gap-5 sm:max-h-full sm:pt-12 xl:w-[25%] xl:border-r"
    >
      <RegularCustomerChatPreview
        :chats="inboxService"
      ></RegularCustomerChatPreview>
    </div>
    <div class="xl:w-[55%]">
      <RegularCustomerChat></RegularCustomerChat>
    </div>
    <div class="xl:w-[20%]">
      <RegularCustomerChatProfile></RegularCustomerChatProfile>
    </div>
  </div>
</template>

<script setup>
import { inboxService } from "@/services/InboxServices";
</script>
