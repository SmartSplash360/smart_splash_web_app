<template>
  <form class="flex flex-col gap-3">
    <div
      class="flex flex-col justify-between gap-8 border-b py-10 sm:flex-row sm:items-center sm:gap-0 sm:py-5"
    >
      <div class="flex flex-col gap-4">
        <h2 class="min-w-max text-[22px] font-[500]">Payment Method</h2>
        <span class="text-sm font-[400] leading-normal"
          >Update your billing deatils and address</span
        >
      </div>
      <div class="flex flex-col justify-end gap-5 sm:flex-row">
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          @click="toggleAddAlertModal"
        />
        <Button label="Save changes" class="!bg-[#0291BF]" />
      </div>
    </div>
    <div class="flex flex-col gap-10 border-b py-10 sm:flex-row sm:gap-64">
      <div class="flex flex-col gap-4">
        <h2 class="min-w-max text-[22px] font-[500]">Card details</h2>
        <span class="text-sm font-[400] leading-normal"
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
          <span class="text-xl leading-7">+</span>
          <span class="text-lg leading-7">Add new payment method</span>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between py-5">
      <div class="flex flex-col gap-10">
        <h2 class="text-[22px] font-[500]">Integratios</h2>
        <div class="flex gap-5 px-5">
          <img :src="QuickBookIcon" alt="quick-book-icon" />
          <div class="flex flex-col gap-3">
            <h2 class="text-[22px] font-[500]">QuickBooks</h2>
            <span class="text-sm font-[400] leading-normal"
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
