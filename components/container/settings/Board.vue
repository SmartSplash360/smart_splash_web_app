<template>
  <section>
    <LazySkeletonSetting v-if="loading"></LazySkeletonSetting>
    <div v-else>
      <TabView v-model:activeIndex="active">
        <TabPanel v-if="user?.role_id === 1">
          <template #header>
            <div class="flex-center min-w-max">
              <span class="span__element">Company Details</span>
            </div>
          </template>
          <RegularSettingsCompanyDetails></RegularSettingsCompanyDetails>
        </TabPanel>
        <TabPanel v-if="user?.role_id === 1">
          <template #header>
            <div class="flex-center min-w-max">
              <span class="span__element">Payment Credentials</span>
            </div>
          </template>
          <RegularSettingsPaymentCredentials></RegularSettingsPaymentCredentials>
        </TabPanel>
        <TabPanel v-if="user?.role_id === 1">
          <template #header>
            <div class="flex-center min-w-max">
              <span class="span__element">Admin Details</span>
            </div>
          </template>
          <RegularSettingsAdminDetails></RegularSettingsAdminDetails>
        </TabPanel>
        <TabPanel v-if="user?.role_id === 1">
          <template #header>
            <div class="flex-center min-w-max">
              <span class="span__element">User Management</span>
            </div>
          </template>
          <RegularSettingsUserManagement></RegularSettingsUserManagement>
        </TabPanel>
        <TabPanel v-if="user?.role_id === 1">
          <template #header>
            <div class="flex-center min-w-max">
              <span class="span__element">Role Management</span>
            </div>
          </template>
          <RegularSettingsRoleManagement></RegularSettingsRoleManagement>
        </TabPanel>
        <TabPanel v-if="user?.role_id === 3">
          <template #header>
            <div class="flex-center min-w-max">
              <span class="span__element">Update My Profile</span>
            </div>
          </template>
          <RegularSettingsCustomerDetails></RegularSettingsCustomerDetails>
        </TabPanel>
        <TabPanel v-if="user?.role_id === 4">
          <template #header>
            <div class="flex-center min-w-max">
              <span class="span__element">Update My Profile</span>
            </div>
          </template>
          <RegularSettingsTechnicianDetails></RegularSettingsTechnicianDetails>
        </TabPanel>
      </TabView>
    </div>
  </section>
</template>

<script setup>
import { useUserStore } from "~/stores/users";

const userStore = useUserStore();

const user = computed(() => userStore.getCurrentUser);

const active = ref(0);
const loading = ref(false);
</script>
