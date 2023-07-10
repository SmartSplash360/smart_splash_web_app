<template>
    <span
        class="inline-flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-md text-xl text-gray-500"
        ><font-awesome-icon :icon="icon"
    /></span>
</template>

<script setup>
defineProps({
    icon : String
})
</script>
