
<template>
  <div class="card flex justify-content-center text-white w-full sm:w-fit">
      <!-- <Toast /> -->
      <FileUpload
          chooseLabel="Upload"
          mode="basic"
          accept="text/csv"
          name="fileImport"
          :maxFileSize="1000000" 
          @upload="onUpload($event)"
          />
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
const toast = useToast();

const props = defineProps({
  loading : Boolean,
  onUpload: Function
})

const onUpload = async (event) => {
  try {
    await props.onUpload(event)
    return
    toast.add({ severity: 'info', summary: 'Import Leads Success', detail: 'Leads Imported', life: 3000 });
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Import Leads Error', detail: 'Leads Import failed', life: 3000 })
  }

};
</script>