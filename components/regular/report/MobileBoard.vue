<template>
  <div class="card flex gap-2 lg:hidden">
    <nuxt-link
      to="/reports/quotes"
      class="w-full flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 bg-[#0291BF] hover:bg-[#025E7C] text-white hover:shadow-xl sm:px-6"
    >
      <img :src="QuotesIconcon" alt="quotes-icon" class="w-4" />
      <span class="min-w-max text-center span__element-large text-xs"
        >Quotes</span
      >
    </nuxt-link>

    <nuxt-link
      to="/reports/invoices"
      class="w-full flex cursor-pointer items-center gap-2 rounded-xl bg-[#0291BF] hover:bg-[#025E7C] px-4 py-3 text-white hover:shadow-xl xl:gap-3 xl:px-6"
    >
      <img :src="InvoiceIcon" alt="invoice-icon" class="w-4" />
      <span class="lg:text-md min-w-max text-center span__element-large text-xs"
        >Invoices</span
      >
    </nuxt-link>

    <span
      @click="loadReviews"
      class="w-full flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 bg-[#0291BF] hover:bg-[#025E7C] text-white hover:shadow-xl sm:px-6"
    >
      <img :src="QuotesIconcon" alt="quotes-icon" class="w-4" />
      <span class="min-w-max text-center span__element-large text-xs"
        >Reviews
      </span>
    </span>
  </div>
</template>

<script setup>
import WorkCaseIcon from "@/assets/icons/work-case-icon.svg";
import QuotesIconcon from "@/assets/icons/cost-estimate-icon.svg";
import InvoiceIcon from "@/assets/icons/invoice-icon.svg";
import ChemicalIcon from "@/assets/icons/chemical-tank-icon.svg";
import CardIcon from "@/assets/icons/payment-icon.svg";

const loadReviews = () => {
  window.location.href = "/reports/reviews";
};
</script>
