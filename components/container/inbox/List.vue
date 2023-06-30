<template>
  <section v-if="loading">
    <SkeletonChatListing></SkeletonChatListing>
  </section>
  <section
    v-else
    class="flex max-h-[90vh] flex-col overflow-y-auto sm:flex-row lg:-mx-10 lg:-mt-10"
  >
    <div class="flex w-full flex-col gap-5 sm:pt-12 lg:w-1/3 lg:border-r">
      <RegularCustomerChatPreview
        :chats="inboxService"
        @select-chat="(chat) => selectChat(chat)"
      ></RegularCustomerChatPreview>
    </div>
    <div class="hidden w-full sm:w-2/3 lg:block">
      <RegularInboxChat :selectedChat="selectedChat"></RegularInboxChat>
    </div>
  </section>
</template>

<script setup>
import { inboxService } from "@/services/InboxServices";




const loading = ref(false);
const selectedChat = ref()

const selectChat = (chat) => {
  selectedChat.value = chat
}


</script>
