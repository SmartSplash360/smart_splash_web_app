<template>
    <div ref="editorContainer" class="dark:bg-[#1B2028]"></div>
  </template>
  
  <script>
  import { onMounted, ref } from '@vue/composition-api';
  import Quill from 'quill';
  
  export default {
    setup() {
      const editorContainer = ref(null);
      let editor;
  
      onMounted(() => {
      const options = {
        theme: 'snow', // Choose your desired theme ('snow', 'bubble', or 'default')
        placeholder: 'Enter text here...', // Placeholder text when the editor is empty
        modules: {
          toolbar: [
            [{ header: [1, 2, 3,4, false] }], // Header options
            ['bold', 'italic', 'underline','strike'], // Text formatting options
            ['link', 'image'], // Insert link and image options
            [{ list: 'ordered' }, { list: 'bullet' }], // Ordered and unordered lists
            ['clean'], // Remove formatting option
          ],
        },
      };

      editor = new Quill(editorContainer.value, options);
    });
  
      return {
        editorContainer,
      };
    },
  };
  </script>
  