<template>
  <div
  v-if="selectedChat"
    class="hidden h-full w-full flex-1 flex-col gap-20 px-8 py-5 pb-5 sm:flex"
  >
    <div class="flex items-center justify-between gap-3">
        <img
          :src="selectedChat.image"
          class="mr-5 h-[55px] w-[55px] rounded-full object-cover xl:h-[75px] xl:w-[75px]"
        />
      <div class="flex w-full flex-col justify-between gap-2">
        <h4 class="heading__h4">{{  selectedChat.name }}</h4>
        <span class="self-start span__element">{{selectedChat.email}}</span>
      </div>
    </div>
    <div class="flex min-h-[40%] flex-1 flex-col gap-8">
      <h2 class="heading__h2">{{  selectedChat.subject }}</h2>
      <p class="paragraph__p dark:text-gray-400">{{selectedChat.message}}</p>

      <p class="paragraph__p dark:text-gray-400">
        Lorem ipsum dolor sit amet consectetur. Ut volutpat duis nulla est. Sit
        vel odio blandit fermentum commodo sed. Sed nisi eleifend at etiam arcu
        eleifend proin eget. Tincidunt gravida dictumst lacus facilisis morbi.
        Viverra non pharetra integer sit volutpat massa est.
      </p>
      <p class="paragraph__p dark:text-gray-400">
        <span class="span__element block">Lorem ipsum</span>
        <span class="span__element"
          >Lorem ipsum dolor sit amet consectetur. Pellentesque egestas cursus
          eu volutpat.</span
        >
      </p>
    </div>
    <div>
      <ckeditor
        :editor="editor"
        v-model="editorData"
        :config="editorConfig"
      ></ckeditor>
    </div>
  </div>
</template>

<script setup>
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";

defineProps({
  selectedChat : Object
})

const editor = ClassicEditor;
const editorData = ref("<p>Content of the editor.</p>");
const editorConfig = reactive({});
</script>
