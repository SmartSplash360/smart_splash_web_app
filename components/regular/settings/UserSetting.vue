<template>
  <form class="flex flex-col gap-5">
    <div class="flex-between py-5">
      <div class="flex flex-col gap-4">
        <h2 class="min-w-max heading__h3">Users</h2>
        <span class="min-w-max span__element span__element-light"
          >Update users Role</span
        >
      </div>
    </div>
    <div
      class="hidden lg:block pb-14 user-setting-table border-b dark:border-b-gray-600"
      :class="[currentMode == 'dark' ? 'dark-mode' : '']"
    >
      <DataTable
        v-model:filters="filters"
        :value="customers"
        paginator
        :rows="7"
        dataKey="id"
        :loading="loading"
        tableStyle="min-height: 30rem"
      >
        <template #header>
          <div class="flex w-full justify-center py-3">
            <span class="p-input-icon-right">
              <i class="pi pi-search" />
              <InputText
                v-model="filters['global'].value"
                placeholder="Search user"
                class="w-full sm:w-[25rem] dark:bg-[#1B2028]"
              />
            </span>
          </div>
        </template>
        <template #empty>
          <div class="flex-center my-5">
            <h3 class="heading__h3 text-gray-600">No Customers found.</h3>
          </div>
        </template>
        <Column field="name" header="Name" style="min-width: 12rem;">
          <template #body="{ data }">
            <div class="align-items-center flex gap-2">
              <img
                :alt="data.representative.name"
                :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`"
                style="width: 32px;"
              />
              <span class="span__element">{{ data.name }}</span>
            </div>
          </template>
        </Column>
        <Column
          header="Date Added"
          Field="country.name"
          style="min-width: 12rem;"
        >
          <template #body="{ data }">
            <div class="align-items-center flex gap-2">
              <span class="span__element">{{
                data.date.toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              }}</span>
            </div>
          </template>
        </Column>
        <Column
          header="Last Active"
          Field="representative"
          :showFilterMenu="false"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 14rem;"
        >
          <template #body="{ data }">
            <div class="align-items-center flex gap-2">
              <span class="span__element">{{
                data.date.toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              }}</span>
            </div>
          </template>
        </Column>
        <Column
          field="status"
          header=""
          :showFilterMenu="false"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 12rem;"
        >
          <template>
            <div class="card justify-content-center flex !text-white">
              <Dropdown
                v-model="selectedRole"
                :options="roles"
                optionLabel="name"
                placeholder="Role"
                class="w-[12rem] bg-black !text-white dark:bg-[#1B2028]"
              />
            </div>
          </template>
        </Column>
        <Column
          field="verified"
          header=""
          dataType="boolean"
          style="min-width: 6rem;"
        >
          <template>
            <i class="pi pi-trash cursor-pointer"></i>
          </template>
        </Column>
      </DataTable>
    </div>
    <div
      class="alert-accordion card flex flex-col lg:hidden bg-white dark:bg-[#1B2028] rounded-t-xl border"
    >
      <div class="flex-center py-5">
        <BaseSearchBar />
      </div>
      <div class="flex-between py-5 px-5 bg-[#025E7C] text-white">
        <h5 class="heading__h5 flex-1 flex justify-start">Name</h5>
        <h5 class="heading__h5 flex-1 flex justify-start">Date Added</h5>
      </div>
      <Accordion :activeIndex="0">
        <AccordionTab v-for="customer in customers" :key="customer.id">
          <template #header>
            <div class="flex-between w-full dark:text-white">
              <div class="mr-5">
                <img
                  :alt="customer.representative.name"
                  :src="`https://primefaces.org/cdn/primevue/images/avatar/${customer.representative.image}`"
                  style="width: 32px;"
                />
              </div>
              <span class="flex-1 paragraph__p">{{ customer.name }}</span>
              <span class="flex-1 paragraph__p">{{ customer.email }}</span>
            </div>
          </template>
          <div
            class="flex flex-col gap-2 py-2 pr-2 dark:text-white bg-[#d4ecf4] dark:bg-[#1B2028] dark:text-white"
          >
            <div class="flex-between dark:bg-[#1B2028] px-4 py-2">
              <span class="text-[#025E7C] dark:text-white span__element flex-1"
                >Last Active</span
              >
              <span class="span__elementflex-1 flex justify-start">
                {{
                  customer.date.toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                }}
              </span>
            </div>
            <div class="card justify-end flex !text-white">
              <Dropdown
                v-model="selectedRole"
                :options="roles"
                optionLabel="name"
                placeholder="Role"
                class="w-[12rem] bg-black !text-white dark:bg-[#1B2028]"
              />
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
    <BaseUserSetting
      :role="'Manager'"
      :settings="managerSetting"
      :value="setting"
    ></BaseUserSetting>
    <BaseUserSetting
      :role="'Staff'"
      :settings="managerSetting"
      :value="setting"
    ></BaseUserSetting>
    <BaseUserSetting
      :role="'Admin'"
      :settings="managerSetting"
      :value="setting"
    ></BaseUserSetting>
  </form>
</template>

<script setup>
import { FilterMatchMode } from "primevue/api";
import { CustomerService } from "@/services/Customers";

const customers = ref();
const selectedRole = ref("");
const loading = ref(true);
const setting = ref();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const roles = ref([
  {
    name: "Manager",
    code: "MNG",
  },
  { name: "Admin", code: "ADM" },
  { name: "Staff", code: "Stf" },
]);
const managerSetting = ref([
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur. Hendrerit aenean convallis morbi commodo et.",
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur. Hendrerit aenean convallis morbi commodo et.",
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur. Hendrerit aenean convallis morbi commodo et.",
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur. Hendrerit aenean convallis morbi commodo et.",
  },
  {
    title: "Lorem ipsum dolor sit amet consectetur.",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur. Hendrerit aenean convallis morbi commodo et.",
  },
]);

const currentMode = ref(localStorage.getItem("nuxt-color-mode"));

onMounted(() => {
  CustomerService.getCustomersMedium().then((data) => {
    customers.value = getCustomers(data);
    loading.value = false;
  });
});

const getCustomers = (data) => {
  return [...(data || [])].map((d) => {
    d.date = new Date(d.date);

    return d;
  });
};
</script>
