<template>
  <div ref="editorContainer">
  </div>
</template>

<script setup>
import Quill from 'quill';
const props = defineProps({
  description : String
})

const emit = defineEmits(['handleEditorChange'])
const editorContainer = ref(null);

let editor;
let content = ref();

onMounted(() => {
  const options = {
    theme: 'snow', 
    placeholder: 'Enter text here...', 
    modules: {
      toolbar: [
        [{ header: [1, 2, 3,4, false] }], 
        ['bold', 'italic', 'underline','strike'], 
        ['link', 'image'], 
        [{ list: 'ordered' }, { list: 'bullet' }], 
        ['clean'], 
      ],
    },
    allowRawHTML: true,
  };

  editor = new Quill(editorContainer.value, options);

  editor.root.innerHTML =  props.description ?? ''

  content.value = editor.root.innerHTML;

  
  editor.on('text-change', () => {
    content.value = editor.root.innerHTML;
    emit('handleEditorChange', content.value)
  });
});
</script>
