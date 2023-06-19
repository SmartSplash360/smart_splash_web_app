<template>
  <div
    class="flex max-h-[90vh] flex-col overflow-y-auto sm:flex-row lg:-mx-10 lg:-mt-10"
  >
    <div
      class="flex max-h-[130px] w-full flex-col gap-5 border-r sm:max-h-full sm:w-1/3 sm:pt-12"
    >
      <RegularCustomerChatPreview :chats="chats"></RegularCustomerChatPreview>
    </div>
    <div class="w-2/3">
      <RegularInboxChat></RegularInboxChat>
    </div>
  </div>
</template>

<script setup>
const chats = ref([
  {
    username: "A.J Beson",
    subject: "Inbox subject",
    message:
      "Lorem ipsum dolor sit amet consectetur Adipiscing sit vitae. Adipiscing sit vitae Adipiscing sit vitae fringilla  rhoncus..",
  },
  {
    username: "Mike Beson",
    subject: "Inbox subject",
    message:
      "Lorem ipsum dolor sit amet consectetur Adipiscing Adipiscing sit vitae Adipiscing sit vitae sit vitae. Adipiscing sit vitae Adipiscing sit vitae fringilla  rhoncus..",
  },
  {
    username: "Sarah Johns",
    subject: "Inbox subject",
    message:
      "Lorem ipsum dolor sit amet consectetur Adipiscing sit vitae. Adipiscing sit vitae Adipiscing sit vitae fringilla  rhoncus..",
  },
  {
    username: "A.J Beson",
    subject: "Inbox subject",
    message:
      "Lorem ipsum dolor sit amet consectetur Adipiscing sit vitae. Adipiscing sit vitae Adipiscing sit vitae fringilla  rhoncus..",
  },
  {
    username: "Mike Beson",
    subject: "Inbox subject",
    message:
      "Lorem ipsum dolor sit amet consectetur Adipiscing sit vitae. Adipiscing sit vitae Adipiscing sit vitae fringilla  rhoncus..",
  },
  {
    username: "A.J Beson",
    subject: "Inbox subject",
    message:
      "Lorem ipsum dolor sit amet consectetur Adipiscing sit vitae. Adipiscing sit vitae Adipiscing sit vitae fringilla  rhoncus..",
  },
  {
    username: "Mike Beson",
    subject: "Inbox subject",
    message:
      "Lorem ipsum dolor sit amet consectetur Adipiscing sit vitae. Adipiscing sit vitae Adipiscing sit vitae fringilla  rhoncus..",
  },
  {
    username: "Sarah Johns",
    subject: "Inbox subject",
    message:
      "Lorem ipsum dolor sit amet consectetur Adipiscing sit vitae. Adipiscing sit vitae Adipiscing sit vitae fringilla  rhoncus..",
  },
  {
    username: "A.J Beson",
    subject: "Inbox subject",
    message:
      "Lorem ipsum dolor sit amet consectetur Adipiscing sit vitae. Adipiscing sit vitae Adipiscing sit vitae fringilla  rhoncus..",
  },
  {
    username: "Mike Beson",
    subject: "Inbox subject",
    message:
      "Lorem ipsum dolor sit amet consectetur Adipiscing sit vitae. Adipiscing sit vitae Adipiscing sit vitae fringilla  rhoncus..",
  },
]);
</script>
