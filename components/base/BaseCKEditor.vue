<template>
    <div class="text-black dark:text-white">
      <ckeditor :editor="editor" v-model="content" :config="editorConfig" class="text-black dark:text-white"></ckeditor>
      <div class="flex justify-end mt-5">
        <Button label="Save" class="!bg-[#0291BF] text-white" @click="save"/>
        </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import CKEditor from '@ckeditor/ckeditor5-vue';
  
  export default {
    components: {
      ckeditor: CKEditor.component,
    },
    setup() {
      const editor = ClassicEditor;
      const content = ref('');
      const editorConfig = {
        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
      };
  
      const save = () => {
        // Implement your save logic here
      };
  
      return {
        editor,
        content,
        editorConfig,
        save,
      };
    },
  };
  </script>
