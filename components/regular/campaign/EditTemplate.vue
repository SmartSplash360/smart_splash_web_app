<template>
    <form class="flex flex-col px-5 lg:px-10">
        <div v-if="edit" class="lg:self-end flex gap-5 items-start">
            <h4 class="heading__h4 font-bold w-full">Select</h4>
            <div class="flex flex-col gap-4">
                <div class="flex items-center">
                    <Checkbox v-model="lead" :binary="true" />
                    <label for="lead" class="ml-2"> Lead </label>
                </div>
                <div class="flex items-center">
                    <Checkbox v-model="customer" :binary="true"/>
                    <label for="customer" class="ml-2"> Customer </label>
                </div>
            </div>
        </div>
        <div v-if="!edit" class="lg:self-end flex gap-5 items-start">
            <div class="card flex justify-content-center">
                <InputText 
                    v-model="campaignType"
                    placeholder="Campaign Type"
                    class="dark:bg-[#1B2028] !outline-none w-full min-w-full"
                    required 
                    />
            </div>
        </div>
        <div class="flex flex-col gap-5 my-5">
            <div class="w-full flex flex-col gap-3">
                <h4 class="heading__h4">Campaign Title*</h4>
                <InputText
                    v-model="name"
                    :placeholder="name? name : 'Enter Title'"
                    class="dark:bg-[#1B2028] !outline-none w-full min-w-full"
                    required
                    />
            </div>
            <div v-if="!edit" class="flex flex-col gap-4 my-10">
            <h4 class="heading__h4">Upload cover</h4>
            <img :src="imageSrc" alt="Uploaded Image" v-if="imageSrc" class="w-48 h-48 rounded-full"/>
            <div class="card">
                <Toast />
                <FileUpload name="basic" @upload="handleUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000">
                    <template #empty>
                        <p>Drag and drop files to here to upload.</p>
                    </template>
                </FileUpload>
            </div>
            <!-- <div class="card flex justify-content-center">
                <input type="file" ref="imageInput" @change="handleUpload" accept="image/*" id="image" required>
            </div> -->
        </div>
            <div>
                <BaseQuillEditor  @handleEditorChange="editorChange" :description="description"/>
            </div>  
        </div>
        <div class="flex justify-end gap-5">        
            <Button label="Cancel"  @click="cancel" class="!bg-white text-black"/>
            <!-- <Button v-if="!edit" label="Save" class="hidden !bg-[#0291BF] text-white" @click="createTemplate"/>
            <Button v-if="edit" label="Send data" class="hidden !bg-[#0291BF] text-white" @click="createCampaign({name,description,templateId,lead,customer})"/> -->
        </div>
    </form>
</template>

<script setup>
    import { useTemplateStore } from '@/stores/templates';
    import { useToast } from "primevue/usetoast";
    import { useConfirm } from "primevue/useconfirm";

    const props = defineProps({
        edit :Boolean,
        campaignId : String,
        createCampaign : Function
    })

    const confirm = useConfirm();
    const toast = useToast();


    const lead = ref(null)
    const customer = ref(null)

    const name = ref();
    const description = ref();
    const selectedFile = ref(null);
    const imageSrc = ref('');
    const campaignType = ref('')
    const templateId = ref();

    const router = useRouter();
    const store = useTemplateStore();

    onMounted(async () => {
        if (props.campaignId) {
            const template = await store.fetchTemplate(props.campaignId);
            templateId.value = template.id
            name.value = template.name
            description.value = template.description

            console.log(template.description)
        }
    })

    const handleUpload = (event) => {
        selectedFile.value = event.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            imageSrc.value = e.target.result;
        };
        reader.readAsDataURL(selectedFile.value);
    };

    // const handleClear = () => {
    //   selectedFile.value = null;
    // };

    const editorChange = (value) => description.value = value;

    const createTemplate = async() => {
        try {
            const formData = new FormData();
            formData.append('name', name.value);
            formData.append('description', description.value);
            formData.append('cover', selectedFile.value);
            
            for (const [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`)
                }
            await store.createTemplate(formData);
            toast.add({ severity: 'info', summary: 'Success', detail: 'Template Created', life: 3000 });
            router.push('/campaigns')

        } catch (error) {
            console.log(error)
        }
    }

    const cancel = () => {
        try {
      confirm.require({
        message: 'Are you sure you want to cancel?',
        header: 'Cancel Template',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
            // delete item
            router.push('/campaigns');
        },
        reject: () => {}
    })
    } catch (error) {
      console.log('Something Occurent')
    }
    }
    
</script>
