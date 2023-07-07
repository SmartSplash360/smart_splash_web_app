<template>
  <form class="flex flex-col gap-3">
    <div
      class="flex flex-col justify-between gap-8 border-b py-10 sm:flex-row sm:items-center sm:gap-0 sm:py-5"
    >
      <div class="flex flex-col gap-4">
        <h2 class="min-w-max heading__h3">Payment Method</h2>
        <span class="min-w-max span__element span__element-light"
          >Update your billing deatils and address</span
        >
      </div>
      <div class="flex flex-col justify-end gap-5 sm:flex-row">
        <Button
          class="hover:shadow-lg"
          label="Cancel"
          severity="secondary"
          outlined
        />
        <Button label="Save changes" class="!bg-[#0291BF] hover:shadow-lg" />
      </div>
    </div>
    <div class="flex flex-col gap-10 border-b py-10 sm:flex-row xl:gap-64">
      <div class="flex flex-col gap-4">
        <h2 class="min-w-max heading__h3">Card details</h2>
        <span class="min-w-max span__element span__element-light"
          >Select default payment method
        </span>
      </div>
      <div class="flex h-full w-full flex-col gap-3">
        <BasePaymentMethodCard
          :icon="VisaIcon"
          :alt="'visa-icon'"
          :name="'Visa'"
          :expiringDate="'06/2024'"
          :method="method"
        ></BasePaymentMethodCard>
        <BasePaymentMethodCard
          :icon="MasterCardIcon"
          :alt="'master-card-icon'"
          :name="'MasterCard'"
          :expiringDate="'06/2024'"
          :method="method"
        ></BasePaymentMethodCard>

        <div class="mt-5 flex items-center gap-3 px-6">
          <span class="span__element">+</span>
          <span class="span__element">Add new payment method</span>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between py-5">
      <div class="flex flex-col gap-10">
        <h2 class="min-w-max heading__h3">Integrations</h2>
        <div class="flex gap-5 px-5">
          <img :src="QuickBookIcon" alt="quick-book-icon" />
          <div class="flex flex-col gap-3">
            <h2 class="heading__h2">QuickBooks</h2>
            <span class="min-w-max span__element span__element-light"
              >Lorem ipsum dolor sit amet consectetur. Turpis ultricies in eu
              proin nullam.</span
            >
          </div>
        </div>
      </div>
      <div
        class="card mt-20 flex flex-col justify-end sm:mt-0 sm:flex-row sm:self-end"
      >
        <InputSwitch v-model="checked" />
      </div>
    </div>
  </form>
</template>

<script setup>
import VisaIcon from "@/assets/images/simple-icons_visa.svg";
import MasterCardIcon from "@/assets/images/logos_mastercard.svg";
import QuickBookIcon from "@/assets/images/quickbooks-icon.svg";

const method = ref("");
const checked = ref(true);
</script>
