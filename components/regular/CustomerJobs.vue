<template>
  <div class="flex h-full flex-col gap-10 overflow-auto">
    <table>
      <tr
        class="grid grid-cols-8 items-center justify-between bg-[#025E7C] text-white"
      >
        <th
          class="flex items-start px-10 py-3 text-[16px] font-[500] leading-8"
        >
          Date
        </th>
        <th class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          Type
        </th>
        <th class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          Address
        </th>
        <th
          class="flex min-w-max items-center justify-center px-5 py-3 text-[16px] font-[500] leading-8"
        >
          Body of water
        </th>
        <th class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          Service level
        </th>
        <th class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          Status
        </th>
        <th class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          Technicians
        </th>
        <th class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          Price
        </th>
      </tr>
      <tr class="grid grid-cols-8 items-center justify-between border">
        <td
          class="flex items-start px-10 py-3 text-[16px] font-[500] leading-8"
        >
          05/04/2023
        </td>
        <td class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          Route
        </td>
        <td class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          24436 Harbour View Driver Pante Vedra Beach Florida 32082
        </td>
        <td
          class="flex items-center justify-center px-5 py-3 text-[16px] font-[500] leading-8"
        >
          <span class="rounded-2xl bg-[#025E7C] px-5 py-1">Pool</span>
        </td>
        <td class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          Rejuvenate (Sundeck)
        </td>
        <td class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          Completed
        </td>
        <td class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          Evan King
        </td>
        <td class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          $2500
        </td>
      </tr>
      <tr class="grid grid-cols-8 items-center justify-between">
        <td
          class="flex items-start px-10 py-3 text-[16px] font-[500] leading-8"
        >
          05/04/2023
        </td>
        <td class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          Route
        </td>
        <td class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          24436 Harbour View Driver Pante Vedra Beach Florida 32082
        </td>
        <td
          class="flex items-center justify-center px-5 py-3 text-[16px] font-[500] leading-8"
        >
          <span class="rounded-2xl bg-[#025E7C] px-5 py-1">Pool</span>
        </td>
        <td class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          Rejuvenate (Sundeck)
        </td>
        <td class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          Completed
        </td>
        <td class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          Evan King
        </td>
        <td class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          $2500
        </td>
      </tr>
      <tr class="grid grid-cols-8 items-center justify-between">
        <td
          class="flex items-start px-10 py-3 text-[16px] font-[500] leading-8"
        >
          05/04/2023
        </td>
        <td class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          Route
        </td>
        <td class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          24436 Harbour View Driver Pante Vedra Beach Florida 32082
        </td>
        <td
          class="flex items-center justify-center px-5 py-3 text-[16px] font-[500] leading-8"
        >
          <span class="rounded-2xl bg-[#025E7C] px-5 py-1">Pool</span>
        </td>
        <td class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          Rejuvenate (Sundeck)
        </td>
        <td class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          Completed
        </td>
        <td class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          Evan King
        </td>
        <td class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8">
          $2500
        </td>
      </tr>
    </table>
    <div
      class="flex h-[100px] items-center justify-between rounded-b-2xl border px-10"
    >
      <button
        class="flex h-[45px] w-[180px] items-center justify-center gap-5 rounded-lg border"
      >
        <span class="inline-flex items-center justify-center text-lg"
          ><font-awesome-icon :icon="['fas', 'arrow-left']" />
        </span>
        <span class="text-[16px] font-[400]">Previous</span>
      </button>
      <button
        class="flex h-[45px] w-[180px] items-center justify-center gap-5 rounded-lg border"
      >
        <span class="text-[16px] font-[400]">Next</span>
        <span class="inline-flex items-center justify-center text-2xl"
          ><font-awesome-icon :icon="['fas', 'arrow-right']" />
        </span>
      </button>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
