<template>
  <form class="flex flex-col gap-5">
    <div class="flex items-center justify-between py-5">
      <div class="flex flex-col gap-4">
        <h2 class="text-[22px] font-[500]">Users</h2>
        <span class="text-sm font-[400] ">Update users Role</span>
      </div>
    </div>
    <div class="card border-b pb-14">
      <DataTable
        v-model:filters="filters"
        :value="customers"
        paginator
        :rows="7"
        dataKey="id"
        :loading="loading"
        tableStyle="min-height: 30rem"
        class="border border-t-0"
      >
        <template #header>
          <div class="flex w-full justify-center py-3">
            <span class="p-input-icon-right">
              <i class="pi pi-search" />
              <InputText
                v-model="filters['global'].value"
                placeholder="Search user"
                class="w-full sm:w-[25rem]"
              />
            </span>
          </div>
        </template>
        <template #empty> No customers found. </template>
        <Column field="name" header="Name" style="min-width: 12rem">
          <template #body="{ data }">
            <div class="align-items-center flex gap-2">
              <img
                :alt="data.representative.name"
                :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`"
                style="width: 32px"
              />
              <span>{{ data.name }}</span>
            </div>
          </template>
        </Column>
        <Column
          header="Date Added"
          Field="country.name"
          style="min-width: 12rem"
        >
          <template #body="{ data }">
            <div class="align-items-center flex gap-2">
              <span>{{
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
          style="min-width: 14rem"
        >
          <template #body="{ data }">
            <div class="align-items-center flex gap-2">
              <span>{{
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
          style="min-width: 12rem"
        >
          <template #body="{ data }">
            <div class="card justify-content-center flex !text-white">
              <Dropdown
                v-model="selectedRole"
                :options="roles"
                optionLabel="name"
                placeholder="Role"
                class="w-[12rem] !bg-gray-200 !text-white"
              />
            </div>
          </template>
        </Column>
        <Column
          field="verified"
          header=""
          dataType="boolean"
          style="min-width: 6rem"
        >
          <template #body="{ data }">
            <i class="pi pi-trash cursor-pointer"></i>
          </template>
        </Column>
      </DataTable>
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
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const selectedRole = ref("");
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
const loading = ref(true);

const setting = ref();

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
