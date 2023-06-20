<template>
  <div
    class="flex gap-5 rounded-2xl border p-5 py-5 sm:min-h-[86px] sm:gap-12 sm:px-8"
    :class="[selected && 'border-[#0291BF] bg-[#f2fafc]']"
  >
    <div class="h-[55px] w-[55px]">
      <img :src="icon" :alt="icon" class="h-full w-full" />
    </div>
    <div class="flex flex-col gap-2 sm:gap-3">
      <h4 class="sm:text-md text-sm font-[500] leading-5 sm:text-lg">
        {{ name }} ending in 1234
      </h4>
      <p class="text-sm">Expiring {{ expiringDate }}</p>
      <div class="mt-4 flex justify-between">
        <p class="text-xs sm:text-sm">Set as default</p>
        <span class="text-xs font-[500] sm:text-sm">Edit</span>
      </div>
    </div>
    <div class="flex flex-1 justify-end">
      <RadioButton
        :v-model="method"
        inputId="method"
        name="visa"
        value="Visa"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: String,
  name: String,
  expiringDate: String,
  method: String,
});
</script>
