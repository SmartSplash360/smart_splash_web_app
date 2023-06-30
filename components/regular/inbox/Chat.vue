<template>
  <div
    class="hidden h-full w-full flex-1 flex-col gap-20 px-8 py-5 pb-5 sm:flex"
  >
    <div class="flex items-center justify-between gap-2">
      <div>
        <Avatar
          :image="userProfile"
          class="mr-2"
          size="xlarge"
          shape="circle"
        />
      </div>
      <div class="flex w-full flex-col justify-between gap-2">
        <h4 class="text-lg font-medium">Sahra Johns</h4>
        <span class="self-start text-sm font-medium">aj.beson@gmail.com</span>
      </div>
    </div>
    <div class="flex min-h-[40%] flex-1 flex-col gap-8">
      <h2 class="text-xl font-bold">Lorem Ipsium dolor</h2>
      <p class="text-md font-medium">Lorem ipsum</p>
      <p class="text-md font-light">
        Lorem ipsum dolor sit amet consectetur. Pellentesque egestas cursus eu
        volutpat.
      </p>
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
import userProfile from "@/assets/images/profile_user.jpg";
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";

const editor = ClassicEditor;
const editorData = ref("<p>Content of the editor.</p>");
const editorConfig = reactive({});
</script>
