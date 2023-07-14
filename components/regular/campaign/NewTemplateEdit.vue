<template>
    <div class="flex flex-col gap-10 px-5 lg:px-10">
        <div class="lg:self-end flex gap-5 items-center">
            <h4 class="heading__h4 font-bold w-full">Select</h4>
            <div class="flex lg:flex-col gap-3">
                <div class="flex items-center">
                    <RadioButton v-model="lead"  />
                    <label for="lead" class="ml-2">Lead</label>
                </div>
                <div class="flex items-center">
                    <RadioButton v-model="customer" />
                    <label for="customer" class="ml-2">Customer</label>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-5">
            <h4 class="heading__h4">Campaign Title*</h4>
            <div class="w-full">
                <InputText
                    v-model="value"
                    placeholder="Lorem ipsum dolor"
                    class="dark:bg-[#1B2028] !outline-none w-full min-w-full"
                    />
            </div>
        </div>
        <BaseCKEditor />
    </div>
</template>

<script setup>
    const lead = ref()
    const customer = ref()
    const value = ref()
</script>

<style lang="scss" scoped>

</style>