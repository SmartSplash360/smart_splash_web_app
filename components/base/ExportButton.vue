
<template>
  <div class="card flex justify-content-center text-white w-full sm:w-fit">
      <Toast />
      <FileUpload 
          mode="basic" 
          name="demo[]" 
          url="./upload.php" 
          accept="image/*" 
          :maxFileSize="1000000" 
          @upload="onUpload" 
          class="!mt-10 sm:mt-0"/>
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
const toast = useToast();

const onUpload = () => {
  toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};
</script>