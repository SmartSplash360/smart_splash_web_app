<template>
  <div
    class="flex max-h-[88vh] flex-col overflow-y-auto sm:flex-row lg:-mx-10 lg:-mt-10"
  >
    <div
      class="flex max-h-[130px] w-full flex-col gap-5 border-r sm:max-h-full sm:w-1/4 sm:pt-12"
    >
      <RegularCustomerChatPreview :chats="chats"></RegularCustomerChatPreview>
    </div>
    <RegularCustomerChat></RegularCustomerChat>
    <RegularCustomerChatProfile></RegularCustomerChatProfile>
  </div>
</template>

<script setup>
const chats = ref([
  {
    username: "Sarah Johns",
    message: "New conversation",
  },
  {
    username: "A.J Beson",
    message:
      "Lorem ipsum dolor sit amet consectetur. Adipiscing sit vitae fringilla rhoncus..",
  },
  {
    username: "Mike Beson",
    message:
      "Lorem ipsum dolor sit amet consectetur. Adipiscing sit vitae fringilla rhoncus..",
  },
  {
    username: "Sarah Johns",
    message:
      "Lorem ipsum dolor sit amet consectetur. Adipiscing sit vitae fringilla rhoncus..",
  },
  {
    username: "A.J Beson",
    message:
      "Lorem ipsum dolor sit amet consectetur. Adipiscing sit vitae fringilla rhoncus..",
  },
  {
    username: "Mike Beson",
    message:
      "Lorem ipsum dolor sit amet consectetur. Adipiscing sit vitae fringilla rhoncus..",
  },
  {
    username: "A.J Beson",
    message:
      "Lorem ipsum dolor sit amet consectetur. Adipiscing sit vitae fringilla rhoncus..",
  },
  {
    username: "Mike Beson",
    message:
      "Lorem ipsum dolor sit amet consectetur. Adipiscing sit vitae fringilla rhoncus..",
  },
  {
    username: "Sarah Johns",
    message:
      "Lorem ipsum dolor sit amet consectetur. Adipiscing sit vitae fringilla rhoncus..",
  },
  {
    username: "A.J Beson",
    message:
      "Lorem ipsum dolor sit amet consectetur. Adipiscing sit vitae fringilla rhoncus..",
  },
  {
    username: "Mike Beson",
    message:
      "Lorem ipsum dolor sit amet consectetur. Adipiscing sit vitae fringilla rhoncus..",
  },
]);
</script>
