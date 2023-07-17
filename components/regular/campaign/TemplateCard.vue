<template>
    <nuxt-link :to="`campaigns/${template.id}`"
        class="card   min-w-full min-h-full flex cursor-pointer justify-center"
    >
      <Card class="min-w-full  shadow-md hover:shadow-xl dark:bg-[#1B2028] dark:text-white">
        <template #header>
          <div class="flex items-center justify-center px-8 py-5 text-[#025E7C] ">
            <img :src="TemplateIcon" alt="template-icon">
          </div>
        </template>
        <template #title>
          <div class="flex flex-col gap-4">
            <h3 class="text-lg font-medium">{{ template.title }}</h3>
            <p class="paragraph__p"> {{ template.content}}</p>
          </div>
        </template>
        <template #content v-if="template.position">
            <Button :label="template.position" class="!bg-[#0291BF] text-white rounded-3xl text-xs font-[400]" />
        </template>
      </Card>
    </nuxt-link>
  </template>
  
  <script setup>

  import TemplateIcon from '@/assets/undraw_svg/undraw_template.svg'
  defineProps({
    template :  Object
  })
  </script>