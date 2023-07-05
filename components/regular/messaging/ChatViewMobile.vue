<template>
    <section
    class=" h-full w-full flex-col gap-20  flex lg:hidden"
  >
    <div class="flex items-center justify-between gap-1">
        <span @click="handlePreviousPage" class="span__element mr-8 cursor-pointer"> 
            <font-awesome-icon icon="chevron-left" />
        </span>
        <img
          :src="selectedChat.image"
          class="mr-3 h-[75px] w-[75px] rounded-full object-cover "
        />
      <div class="flex w-full flex-col justify-between gap-1">
        <h2 class="heading__h2">{{  selectedChat.name }}</h2>
        <span class="self-start span__element">{{selectedChat.email}}</span>
      </div>
    </div>
    <div class="flex flex-col gap-8">
      <h2 class="heading__h2">{{  selectedChat.subject }}</h2>
      <p class="paragraph__p">{{selectedChat.message}}</p>

      <p class="paragraph__p">
        Lorem ipsum dolor sit amet consectetur. Ut volutpat duis nulla est. Sit
        vel odio blandit fermentum commodo sed. Sed nisi eleifend at etiam arcu
        eleifend proin eget. Tincidunt gravida dictumst lacus facilisis morbi.
        Viverra non pharetra integer sit volutpat massa est.
      </p>
      <p class="paragraph__p">
        <span class="span__element block">Lorem ipsum</span>
        <span class="span__element"
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
  