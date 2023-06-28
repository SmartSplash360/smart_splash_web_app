<template>
  <section v-if="loading">
    <LazySkeletonSetting></LazySkeletonSetting>
  </section>
  <section v-else>
    <TabView v-model:activeIndex="active">
      <TabPanel>
        <template #header>
          <div class="flex min-w-max items-center justify-center">
            <span class="text-[18px] font-[500]">Company Details</span>
          </div>
        </template>
        <RegularSettingsCompanyDetails></RegularSettingsCompanyDetails>
      </TabPanel>
      <TabPanel>
        <template #header>
          <div class="flex min-w-max items-center justify-center">
            <span class="text-[18px] font-[500]">Payment Credentials</span>
          </div>
        </template>
        <RegularSettingsPaymentCredentials></RegularSettingsPaymentCredentials>
      </TabPanel>
      <TabPanel>
        <template #header>
          <div class="flex min-w-max items-center justify-center">
            <span class="text-[18px] font-[500]">User Settings</span>
          </div>
        </template>
        <RegularSettingsUserSetting></RegularSettingsUserSetting>
      </TabPanel>
    </TabView>
  </section>
</template>

<script setup>
const active = ref(0);
const loading = ref(true);
</script>
