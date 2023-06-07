<template>
  <div class="flex flex-col gap-10">
    <div class="flex justify-start gap-20">
      <div class="relative flex">
        <input
          type="text"
          name="search-bar"
          placeholder="Search"
          class="h-[45px] w-[233px] rounded-xl border px-10 text-[18px] leading-[18px] outline-none"
        />
        <span class="absolute left-3 top-3 text-[16px]">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </span>
      </div>
      <div class="relative flex justify-end">
        <select
          name="sorting"
          class="h-[40px] w-[233px] rounded-xl border px-10 text-sm leading-[18px] outline-none"
        >
          <option value="">Sort by</option>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
        <span class="absolute left-2 top-1">
          <font-awesome-icon :icon="['fasr', 'arrow-up-arrow-down']" />
        </span>
      </div>
      <div>
        <div></div>
      </div>
    </div>
    <div>
      <table class="w-full">
        <tr
          class="grid grid-cols-5 items-center justify-between rounded-t-2xl border border-b-0"
        >
          <th
            class="flex items-start px-10 py-3 text-[16px] font-[500] leading-8"
          >
            No
          </th>
          <th
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Customer
          </th>
          <th
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Address
          </th>
          <th
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Cellnumber
          </th>
          <th
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Email address
          </th>
        </tr>
        <tr
          class="grid grid-cols-5 items-center justify-between border border-b-0"
        >
          <td
            class="flex items-start px-10 py-3 text-[16px] font-[500] leading-8"
          >
            1
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Maria Anders
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Germany
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Germany
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Germany
          </td>
        </tr>
        <tr
          class="grid grid-cols-5 items-center justify-between border border-b-0"
        >
          <td
            class="flex items-start px-10 py-3 text-[16px] font-[500] leading-8"
          >
            2
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Francisco Chang
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Mexico
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Mexico
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Mexico
          </td>
        </tr>
        <tr
          class="grid grid-cols-5 items-center justify-between border border-b-0"
        >
          <td
            class="flex items-start px-10 py-3 text-[16px] font-[500] leading-8"
          >
            3
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Francisco Chang
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Mexico
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Mexico
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Mexico
          </td>
        </tr>
        <tr
          class="grid grid-cols-5 items-center justify-between border border-b-0"
        >
          <td
            class="flex items-start px-10 py-3 text-[16px] font-[500] leading-8"
          >
            4
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Francisco Chang
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Mexico
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Mexico
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Mexico
          </td>
        </tr>
        <tr
          class="grid grid-cols-5 items-center justify-between border border-b-0"
        >
          <td
            class="flex items-start px-10 py-3 text-[16px] font-[500] leading-8"
          >
            5
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Francisco Chang
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Mexico
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Mexico
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Mexico
          </td>
        </tr>
        <tr
          class="grid grid-cols-5 items-center justify-between border border-b-0"
        >
          <td
            class="flex items-start px-10 py-3 text-[16px] font-[500] leading-8"
          >
            6
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Francisco Chang
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Mexico
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Mexico
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Mexico
          </td>
        </tr>
        <tr
          class="grid grid-cols-5 items-center justify-between border border-b-0"
        >
          <td
            class="flex items-start px-10 py-3 text-[16px] font-[500] leading-8"
          >
            7
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Francisco Chang
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Mexico
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Mexico
          </td>
          <td
            class="flex items-start px-5 py-3 text-[16px] font-[500] leading-8"
          >
            Mexico
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
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
