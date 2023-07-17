<template>
    <div class="flex flex-col px-5 lg:px-10">
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
        <div class="flex flex-col gap-5 my-10">
            <h4 class="heading__h4">Campaign Title*</h4>
            <div class="w-full">
                <InputText
                    v-model="name"
                    :placeholder="name? name : 'Lorem ipsum dolor'"
                    class="dark:bg-[#1B2028] !outline-none w-full min-w-full"
                    />
            </div>
        </div>
        <div v-if="!edit" class="flex flex-col gap-5 my-10">
            <h4 class="heading__h4">Campaign cover</h4>
            <img :src="imageSrc" alt="Uploaded Image" v-if="imageSrc" class="w-48 h-48 rounded-full"/>
            <div class="card flex justify-content-center">
                <input type="file" ref="imageInput" @change="handleUpload" accept="image/*" id="image">
            </div>
        </div>
        <BaseQuillEditor  @handleEditorChange="editorChange" :description="description"/>        
        <div class="flex justify-end mt-5 gap-5">        
            <Button label="Cancel"  @click="cancel"/>
            <Button v-if="!edit" label="Save" class="!bg-[#0291BF] text-white" @click="createTemplate"/>
            <Button v-if="edit" label="Send data" class="!bg-[#0291BF] text-white" @click="createCampaign({name,description,templateId,lead,customer})"/>
        </div>
    </div>
</template>

<script setup>
    import { useTemplateStore } from '@/stores/templates';
    import { useToast } from "primevue/usetoast";
    import { useConfirm } from "primevue/useconfirm";

    const confirm = useConfirm();
    const toast = useToast();

    const props = defineProps({
        edit :Boolean,
        campaignId : String,
        createCampaign : Function
    })

    const lead = ref(null)
    const customer = ref(null)
    const name = ref();
    const description = ref();
    const selectedFile = ref(null);
    const templateId = ref();
    const imageSrc = ref('');

    const data = {
        title : name.value,
        message : description.value,
        templateId : templateId.value
    }

    const router = useRouter();
    const store = useTemplateStore();

    onMounted(async () => {
        if (props.campaignId) {
            const template = await store.fetchTemplate(props.campaignId);
            templateId.value = template.id
            name.value = template.name
            description.value = template.description
        }
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
