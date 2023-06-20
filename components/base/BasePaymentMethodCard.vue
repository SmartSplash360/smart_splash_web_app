<template>
  <div
    class="flex min-h-[86px] gap-12 rounded-2xl border px-8 py-5"
    :class="[selected && 'border-[#0291BF] bg-[#f2fafc]']"
  >
    <div class="h-[55px] w-[55px]">
      <img :src="icon" :alt="icon" class="h-full w-full" />
    </div>
    <div class="flex flex-col gap-3">
      <h4 class="text-lg font-[500] leading-5">{{ name }} ending in 1234</h4>
      <p class="text-sm">Expiring {{ expiringDate }}</p>
      <div class="mt-4 flex justify-between">
        <p class="text-sm">Set as default</p>
        <span class="text-sm font-[500]">Edit</span>
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
