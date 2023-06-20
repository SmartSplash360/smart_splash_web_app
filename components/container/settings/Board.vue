<template>
  <TabView v-model:activeIndex="active">
    <TabPanel>
      <template #header>
        <div class="flex items-center justify-center gap-3">
          <span class="text-[18px] font-[500]">Company Details</span>
          <span
            class="flex h-[30px] w-[30px] items-center justify-center"
          ></span>
        </div>
      </template>
      <RegularSettingsCompanyDetails></RegularSettingsCompanyDetails>
    </TabPanel>
    <TabPanel>
      <template #header>
        <div class="flex items-center justify-center gap-3">
          <span class="text-[18px] font-[500]">Payment Credentials</span>
          <span
            class="flex h-[30px] w-[30px] items-center justify-center"
          ></span>
        </div>
      </template>
      <RegularSettingsPaymentCredentials></RegularSettingsPaymentCredentials>
    </TabPanel>
    <TabPanel>
      <template #header>
        <div class="flex items-center justify-center gap-3">
          <span class="text-[18px] font-[500]">User Settings</span>
          <span
            class="bg- flex h-[30px] w-[30px] items-center justify-center"
          ></span>
        </div>
      </template>
      <RegularSettingsUserSetting></RegularSettingsUserSetting>
    </TabPanel>
  </TabView>
</template>

<script setup></script>

<style lang="scss" scoped></style>
