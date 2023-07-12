<template>
    <div
        class="absolute right-10 z-10 flex min-w-[210px] flex-col  items-center justify-center rounded-md shadow-lg bg-white dark:bg-[#1B2028]"
    >
        <div
            @click="convertToCustomer"
            class="flex w-full cursor-pointer items-center gap-5 py-4 px-4  hover:bg-gray-200  hover:rounded-t-md hover:text-black dark:hover:text-white dark:hover:bg-gray-700"
        >
        <i class="pi pi-sync"></i>

        <span class="min-w-max span__element">Convert to customer</span
        >
        </div>
        <div
            @click="sendMessage"
            class="flex w-full cursor-pointer items-center gap-5 py-4 px-4 border-t hover:bg-gray-200 hover:text-black dark:hover:text-white dark:hover:bg-gray-700"
        >
        <i class="pi pi-comments"></i>

        <span class="min-w-max span__element">Message</span
        >
        </div>
        <div
            @click="makeCall"
            class="flex w-full cursor-pointer items-center gap-5 py-4 px-4 border-t hover:bg-gray-200 hover:text-black dark:hover:text-white dark:hover:bg-gray-700"
        >
        <i class="pi pi-phone"></i>

        <span class="min-w-max span__element">Call</span
        >
        </div>
        <div
            @click="editLead"
            class="flex w-full cursor-pointer items-center gap-5 py-4 px-4 border-t hover:bg-gray-200 hover:text-black dark:hover:text-white dark:hover:bg-gray-700"
        >
        <i class="pi pi-pencil"></i>

        <span class="min-w-max span__element">Edit</span
        >
        </div>
        <div
            @click="deleteLead"
            class="flex w-full cursor-pointer items-center gap-5 py-4 px-4 border-t hover:bg-gray-200 hover:text-black dark:hover:text-white dark:hover:bg-gray-700"
        >
        <i class="pi pi-trash"></i>

        <span class="min-w-max span__element">Delete</span
        >
        </div>
    </div>
</template>

<script setup>

const convertToCustomer = () => {}
const sendMessage = () => {}
const makeCall = () => {}
const editLead = () => {};
const deleteLead = async (id) => {};
</script>

