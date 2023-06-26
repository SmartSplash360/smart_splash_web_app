<template>
  <div
    class="flex max-h-[90vh] flex-col overflow-y-auto sm:flex-row lg:-mx-10 lg:-mt-10"
  >
    <div
      class="flex max-h-[130px] w-full flex-col gap-5 border-r sm:max-h-full sm:w-[30%] sm:pt-12"
    >
      <RegularCustomerChatPreview
        :chats="inboxService"
      ></RegularCustomerChatPreview>
    </div>
    <div class="sm:w-[70%]">
      <RegularInboxChat></RegularInboxChat>
    </div>
  </div>
</template>

<script setup>
import { inboxService } from "@/services/InboxServices";
</script>
