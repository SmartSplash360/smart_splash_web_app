<template>
  <section v-if="loading">
    <SkeletonChatListing></SkeletonChatListing>
  </section>
  <section
    v-else
    class="flex max-h-[90vh] flex-col overflow-y-auto sm:flex-row lg:-mx-10 lg:-mt-10"
  >
    <div
      class="flex w-full flex-col gap-5 sm:max-h-full sm:pt-12 xl:w-[30%] xl:border-r dark:border-r-gray-600"
    >
      <RegularMessagingChatPreview
        :path="'customers/leads'"
        :chats="inboxService"
        @select-chat="(chat) => selectChat(chat)"
      ></RegularMessagingChatPreview>
    </div>
    <div class="xl:w-[50%]">
      <RegularMessagingChat :selectedChat="selectedChat"></RegularMessagingChat>
    </div>
    <div class="xl:w-[20%]">
      <RegularMessagingChatProfile :selectedChat="selectedChat"></RegularMessagingChatProfile>
    </div>
  </section>
</template>

<script setup>
import { inboxService } from "@/services/InboxServices";

const loading = ref(false);
const selectedChat = ref(inboxService[0])

const selectChat = (chat) => {
  selectedChat.value = chat
}
</script>
