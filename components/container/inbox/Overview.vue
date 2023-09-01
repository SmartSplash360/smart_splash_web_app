<template>
  <section v-if="loading || !selectedChat" class="lg:hidden">
    <SkeletonChatOverview></SkeletonChatOverview>
  </section>
  <RegularMessagingChatViewMobile :path="'inbox'" :selectedChat="selectedChat">
  </RegularMessagingChatViewMobile>
</template>

<script setup>
const props = defineProps({
  inboxId: String,
});

const loading = ref(false);

const selectedChat = {
  id: 1000,
  name: "James Butt",
  subject: "Benton, John B Jr",
  phone_number: "+1 (866) 430-2829",
  date: "2015-09-13",
  status: true,
  activity: 17,
  message:
    "The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content",
  image:
    "https://pbs.twimg.com/profile_images/1485050791488483328/UNJ05AV8_400x400.jpg",
  email: "lenajustice@austech.com",
  time: "17:20",
  position: "Cleaning Tech",
  address: "1527 Pond Reef Rd, Ketchikan, Alaska 99901, USA",
};
</script>
