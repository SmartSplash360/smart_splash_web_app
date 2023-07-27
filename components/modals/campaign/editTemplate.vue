<template>
    <div
        @click="toggleEditTemplateModal"
        class="fixed bottom-0 left-0 right-0 top-0 z-[1000] flex-center bg-[#000000da]"
    >
    <form           
        @click.stop
        class="flex min-w-full flex-col rounded-md bg-white p-6 lg:min-w-[950px] dark:bg-[#31353F]">
        <div 
            class="flex flex-col gap-3 my-4">
            <h2 class="heading__h2 font-bold text-[#025E7C]">
            Edit Template {{ `#${template?.id}` }}
        </h2>
            <div class="w-full">
                <InputText
                    v-model="name"
                    :placeholder="name? name : 'Lorem ipsum dolor'"
                    class="dark:bg-[#1B2028] !outline-none w-full min-w-full"
                    />
            </div>
        </div>
        <div class="flex flex-col gap-5 my-4">
            <h4 class="heading__h4">Campaign cover</h4>
            <img :src="imageSrc" alt="Uploaded Image" v-if="imageSrc" class="w-48 h-48 rounded-full"/>
            <div class="card flex justify-content-center">
                <input type="file" ref="imageInput" @change="handleUpload" accept="image/*" id="image">
            </div>
        </div>
        <BaseQuillEditor :description="description"/>        
        <div class="mt-5 flex justify-end gap-5">
          <Button
              label="Cancel"
              severity="secondary"
              outlined
              @click="toggleEditTemplateModal({ show: false })"
              class="hover:shadow-xl"
          />
          <Button
              label="Update"
              icon="pi pi-check"
              class="!bg-[#0291BF] hover:shadow-xl text-white"
              @click="editTemplate()"
          />
        </div>
    </form>
    </div>
</template>

<script setup>
    import { useTemplateStore } from '@/stores/templates';
    import { useToast } from "primevue/usetoast";
    const toast = useToast();

    const props = defineProps({
        campaignId : String,
        toggleEditTemplateModal : Function,
        template : Object
    })
    const name = ref(props.template.name);
    const description = ref();
    const selectedFile = ref(null);
    const imageSrc = ref('');

    const router = useRouter();
    const store = useTemplateStore()

    const handleUpload = (event) => {
        selectedFile.value = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            imageSrc.value = e.target.result;
        };
        reader.readAsDataURL(selectedFile.value);
        toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    };
    const handleClear = () => {
      selectedFile.value = null;
    };
    // const editorChange = (value) => description.value = value;
    const editTemplate = async() => {
        try {
            const formData = new FormData();
            formData.append('name', name.value);
            formData.append('description', description.value);
            formData.append('cover', selectedFile.value);
            
            await store.editTemplate(formData);
            toast.add({ severity: 'info', summary: 'Success', detail: 'Template Created', life: 3000 });
            router.push('/campaigns')

        } catch (error) {
            console.log(error)
        }
    }
    
</script>
