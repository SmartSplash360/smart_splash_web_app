<template>
  <div
    class="flex gap-5 rounded-2xl border p-5 py-5 hover:shadow-md sm:min-h-[86px] sm:gap-12 sm:px-8 dark:bg-[#1B2028]"
    :class="[method && 'border-[#0291BF] bg-[#f2fafc]']"
  >
    <div class="h-[55px] w-[55px]">
      <img :src="icon" :alt="icon" class="h-full w-full" />
    </div>
    <div class="flex flex-col gap-2 sm:gap-3">
      <h4 class="heading__h4">
        {{ name }} ending in {{endingDigit}}
      </h4>
      <p class="paragraph__p">Expiring {{ payment.paymentDetails.expiringDate }}</p>
      <div class="mt-4 flex justify-between items-center">
        <p class="paragraph__p">Set as default</p>
        <span class="span__element cursor-pointer" @click="handleEdit(payment)">Edit</span>
      </div>
    </div>
    <div class="flex flex-1 justify-end">
      <RadioButton
        :v-model="method"
        :inputId="name"
        name="method"
        :value="name"
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
  handleEdit : Function,
  payment : Object,
});


const endingDigit = computed(() => {
  return parseInt(props.payment.paymentDetails.cardNumber) % 10000;
})
</script>
