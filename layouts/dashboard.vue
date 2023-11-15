<template>
  <main
    class="flex max-h-[110vh] flex-col dark:bg-[#31353F] dark:text-white sm:flex-row"
  >
    <div class="hidden lg:block" :class="[toggleSide && 'w-[100px]']">
      <UiTheSidebar
        :toggleSide="toggleSide"
        :handleToggleSide="handleToggleSide"
      ></UiTheSidebar>
    </div>
    <div
      class="max-h-[100vh] min-h-[100vh] w-full overflow-hidden overflow-y-auto"
    >
      <UiTheNavbar :setColorTheme="setColorTheme"></UiTheNavbar>
      <div class="lg:hidden">
        <UiTheSidebar></UiTheSidebar>
      </div>
      <div class="px-5 py-6 lg:px-10 lg:py-12">
        <slot></slot>
      </div>
    </div>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
  </main>
</template>

<script setup>
import { useUserStore } from "~/stores/users";
import messaging from "@/plugins/firebase";

const toggleSide = ref(false);
const handleToggleSide = () => (toggleSide.value = !toggleSide.value);

const userStore = useUserStore();

const setColorTheme = (newTheme) => {
  useColorMode().preference = newTheme;
  userStore.userDefinedTheme = true;
  location.reload();
};
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
.customer-table .p-datatable-wrapper {
  border: 1px solid #dee2e6;
  border-bottom: 0;
  background-color: inherit;
}

.dark-mode .p-datatable-wrapper {
  border: 1px solid #4b5563;
  border-bottom: 0;
  background-color: inherit;
}

.customer-table .p-datatable .p-datatable-tbody > tr > td {
  text-align: left;
  border: 1px solid #dee2e6;
  border-width: 0 0 1px 0;
  padding: 1rem 1rem;
}

.dark-mode .p-datatable .p-datatable-tbody > tr > td {
  text-align: left;
  border: 1px solid #4b5563;
  border-width: 0 0 1px 0;
  padding: 1rem 1rem;
}

.customer-table
  .p-datatable.p-datatable-hoverable-rows
  .p-datatable-tbody
  > tr:not(.p-highlight):hover,
.customer-job-table
  .p-datatable.p-datatable-hoverable-rows
  .p-datatable-tbody
  > tr:not(.p-highlight):hover,
.alert-table
  .p-datatable.p-datatable-hoverable-rows
  .p-datatable-tbody
  > tr:not(.p-highlight):hover,
.products-table
  .p-datatable.p-datatable-hoverable-rows
  .p-datatable-tbody
  > tr:not(.p-highlight):hover,
.services-table
  .p-datatable.p-datatable-hoverable-rows
  .p-datatable-tbody
  > tr:not(.p-highlight):hover,
.report-table
  .p-datatable.p-datatable-hoverable-rows
  .p-datatable-tbody
  > tr:not(.p-highlight):hover,
.user-setting-table
  .p-datatable.p-datatable-hoverable-rows
  .p-datatable-tbody
  > tr:not(.p-highlight):hover,
.technician-job-table
  .p-datatable.p-datatable-hoverable-rows
  .p-datatable-tbody
  > tr:not(.p-highlight):hover {
  background: #d4ecf4;
  color: #6b7280;
  cursor: pointer;
}
.dark-mode
  > .p-datatable.p-datatable-hoverable-rows
  .p-datatable-tbody
  > tr:not(.p-highlight):hover {
  background: #1b2028;
  color: #fff;
  cursor: pointer;
}
</style>
