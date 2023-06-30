<template>
  <section v-if="loading">
    <SkeletonChatListing></SkeletonChatListing>
  </section>
  <section
    v-else
    class="flex max-h-[95vh] flex-col overflow-y-auto sm:flex-row lg:-mx-10 lg:-mt-10"
  >
    <div
      class="flex w-full flex-col gap-5 sm:max-h-full sm:pt-12 xl:w-[25%] xl:border-r"
    >
      <RegularCustomerChatPreview
        :chats="inboxService"
        @select-chat="(chat) => selectChat(chat)"
      ></RegularCustomerChatPreview>
    </div>
    <div class="xl:w-[55%]">
      <RegularCustomerChat :selectedChat="selectedChat"></RegularCustomerChat>
    </div>
    <div class="xl:w-[20%]">
      <RegularCustomerChatProfile :selectedChat="selectedChat"></RegularCustomerChatProfile>
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
