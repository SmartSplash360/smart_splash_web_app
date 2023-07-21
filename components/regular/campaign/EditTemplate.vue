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
            <div class="card flex w-full justify-center sm:w-fit b">
                <Dropdown
                @change="selectType(templateType)"
                v-model="templateType"
                :options="types"
                optionLabel="state"
                placeholder="Campaign Type"
                class="w-full md:w-52 dark:bg-[#1B2028]"
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
                <!-- <Toast /> -->
                <FileUpload name="basic" @upload="handleUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000">
                    <template #empty>
                        <p>Drag and drop files to here to upload.</p>
                    </template>
                </FileUpload>
            </div>
        </div>
            <div>
                <BaseQuillEditor  @handleEditorChange="editorChange" :description="description"/>
            </div>  
        </div>
        <div class="flex justify-end gap-5">      
            <Button label="Cancel"  @click="cancel" class="!bg-white text-black"/>
            <Button v-if="!edit" label="Save" class="hidden !bg-[#0291BF] text-white" @click="createTemplate"/>
            <Button v-if="edit" 
                :label="templateType === 1 ? 'Send Email Campagin' : 'Send SMS Campaign'" 
                class="hidden !bg-[#0291BF] text-white" 
                @click="createCampaign({name,description,templateId,templateType,lead,customer})"/>
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
    const templateId = ref();
    const templateType = ref();
    const types = ref([
        { state : 'Email Campaign', option : 1},
        {state : 'SMS Campaign', option : 2}
    ])

    const store = useTemplateStore();

    onMounted(async () => {
        if (props.campaignId) {
            const template = await store.fetchTemplate(props.campaignId);
            templateId.value = template.id
            name.value = template.name
            description.value = template.description
            templateType.value = template.template_type_id
        }
    })

    const editorChange = (value) => description.value = value;
    const selectType = (value) => {
        templateType.value = value.option;
    }
    const handleUpload = (event) => {
        selectedFile.value = event.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            imageSrc.value = e.target.result;
        };
        reader.readAsDataURL(selectedFile.value);
    };
    const cancel = () => {
        try {
            confirm.require({
                message: 'Are you sure you want to cancel?',
                header: 'Cancel Template',
                icon: 'pi pi-exclamation-triangle',
                accept: async () => {
                    // delete item
                    window.location.href = 'http://localhost:3000/campaigns';
                },
                reject: () => {}
            })
        } catch (error) {            
            toast.add({ severity: 'error', summary: 'Error', detail: 'Error Occured', life: 3000 });
        }
    }
    const createTemplate = async() => {
        try {
            const formData = new FormData();
            formData.append('name', name.value);
            formData.append('description', description.value);
            formData.append('cover', selectedFile.value);
            formData.append('template_type_id', templateType.value);

            await store.createTemplate(formData);
            toast.add({ severity: 'success', summary: 'Success', detail: 'Template Created', life: 3000 });
            setTimeout(() => {
                window.location.href = 'http://localhost:3000/campaigns';
            },5000)

        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Error Occured', life: 3000 });
        }
    }
    
</script>
