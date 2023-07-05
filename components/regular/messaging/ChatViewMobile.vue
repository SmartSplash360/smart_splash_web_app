<template>
    <section
    class=" h-full w-full flex-col gap-20  flex lg:hidden"
  >
    <div class="flex items-center justify-between gap-1">
        <span @click="handlePreviousPage" class="text-xl font-[800] mr-8 cursor-pointer"> 
            <font-awesome-icon icon="chevron-left" />
        </span>
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
    selectedChat : Object,
    path : String
  })
  
const router = useRouter()
  const handlePreviousPage = () => router.go(-1)
  </script>
  