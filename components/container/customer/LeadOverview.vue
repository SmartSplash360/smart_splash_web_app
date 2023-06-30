<template>
    <section v-if="loading || !selectedChat" class="lg:hidden">
      <SkeletonChatOverview></SkeletonChatOverview>
    </section>
    <section
    v-if="selectedChat"
    class=" h-full w-full flex-col gap-20  flex lg:hidden"
  >
    <div class="flex items-center justify-between gap-1">
        <nuxt-link to="/customers" class="text-xl font-[800] mr-8 cursor-pointer"> 
            <font-awesome-icon icon="chevron-left" />
        </nuxt-link>
        <img
          :src="selectedChat.image"
          class="mr-3 h-[75px] w-[75px] rounded-full object-cover "
        />
      <div class="flex w-full flex-col justify-between gap-1">
        <h4 class="text-xl font-bold">{{  selectedChat.name }}</h4>
        <span class="self-start text-sm font-medium">{{selectedChat.email}}</span>
      </div>
    </div>
    <div class="flex flex-col gap-8">
      <h2 class="text-xl font-bold">{{  selectedChat.subject }}</h2>
      <p class="text-md font-normal tracking-wider">{{selectedChat.message}}</p>

      <p class="text-sm font-medium">
        Lorem ipsum dolor sit amet consectetur. Ut volutpat duis nulla est. Sit
        vel odio blandit fermentum commodo sed. Sed nisi eleifend at etiam arcu
        eleifend proin eget. Tincidunt gravida dictumst lacus facilisis morbi.
        Viverra non pharetra integer sit volutpat massa est.
      </p>
      <p class="text-sm font-medium">
        <span class="block">Lorem ipsum</span>
        <span
          >Lorem ipsum dolor sit amet consectetur. Pellentesque egestas cursus
          eu volutpat.</span
        >
      </p>
    </div>
  </section>
  </template>
  
<script setup>
  
const props =   defineProps({
    inboxId : String
  })


  const loading = ref(false);

  const selectedChat =   {
    id: 1000,
    name: "James Butt",
    subject: "Benton, John B Jr",
    phone_number: "+1 (866) 430-2829",
    date: "2015-09-13",
    status: true,
    activity: 17,
    message:"The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content", 
    image:
      "https://pbs.twimg.com/profile_images/1485050791488483328/UNJ05AV8_400x400.jpg",
    email: "lenajustice@austech.com",
    time: "17:20",
    position: "Cleaning Tech",
    address : "1527 Pond Reef Rd, Ketchikan, Alaska 99901, USA"
  }
  
  
  </script>
  