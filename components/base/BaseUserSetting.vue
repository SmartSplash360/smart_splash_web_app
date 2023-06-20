<template>
  <div
    class="flex flex-col gap-10 border-b py-10 sm:flex-row sm:justify-between sm:gap-0"
  >
    <div class="flex flex-col gap-2">
      <h4 class="text-lg font-[500]">{{ role }} Settings</h4>
      <p class="text-sm font-[600] text-[#0291BF]">Reset to default</p>
    </div>
    <div class="card justify-content-center flex flex-col gap-8 sm:w-2/3">
      <div v-for="setting in settings" class="flex items-start gap-4">
        <Checkbox :v-model="value" :name="value" :value="value" />
        <div class="flex flex-col gap-2">
          <p class="text-md font-[500]">
            {{ setting.title }}
          </p>
          <span class="text-sm text-[#565656]"> {{ setting.subtitle }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  role: String,
  settings: Array,
  value: String,
});
</script>
