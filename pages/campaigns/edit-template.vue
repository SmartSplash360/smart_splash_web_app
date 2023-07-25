<template>
    <form    class="flex min-w-full flex-col rounded-md bg-white p-6 lg:min-w-[950px] dark:bg-[#31353F]">
        <div class="flex items-center gap-4 text-[#025E7C]">
            <nuxt-link to="/products">
                <font-awesome-icon icon="chevron-left" />
            </nuxt-link>  
            <h2 class="heading__h2 font-bold text-[#025E7C]">
            Edit Template {{ `#${template?.id}` }}
        </h2>
        </div>
            <div class="w-full">
                <InputText
                    v-model="name"
                    :placeholder="name? name : 'Lorem ipsum dolor'"
                    class="dark:bg-[#1B2028] !outline-none w-full min-w-full"
                    />
        </div>
        <div class="flex flex-col gap-5 my-4">
            <h4 class="heading__h4">Campaign cover</h4>
            <img :src="imageSrc" alt="Uploaded Image" v-if="imageSrc" class="w-48 h-48 rounded-full"/>
            <div class="card flex justify-content-center">
                <input type="file" ref="imageInput" @change="handleUpload" accept="image/*" id="image">
            </div>
        </div>
        <BaseQuillEditor  @handleEditorChange="editorChange" :description="description"/>        
        <div class="mt-5 flex justify-end gap-5">
          <Button
              label="Cancel"
              severity="secondary"
              outlined
              class="hover:shadow-xl"
          />
          <Button
              label="Update"
              class="!bg-[#0291BF] hover:shadow-xl text-white"
              @click="editTemplate()"
          />
        </div>
    </form>
</template>

<script setup>
    import { useTemplateStore } from '@/stores/templates';
    import { useToast } from "primevue/usetoast";

    definePageMeta({
    layout: "dashboard",
    middleware: ['auth','auto-theme'],
    });

    const toast = useToast();


    const name = ref();
    const description = ref();
    const selectedFile = ref(null);
    const imageSrc = ref('');

    const store = useTemplateStore();
    const router = useRouter()
    const route = useRoute();
    const templateId = route.query.templateId;

    onMounted(async () => {
        const template = await useTemplateStore.fetchTemplate(templateId)
        name.value = template.name
    })

    const handleUpload = (event) => {
        selectedFile.value = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            imageSrc.value = e.target.result;
        };
        reader.readAsDataURL(selectedFile.value);
        toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    };
 
    const editorChange = (value) => description.value = value;
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
