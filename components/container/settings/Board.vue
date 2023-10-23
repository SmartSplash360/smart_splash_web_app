<template>
  <section v-if="loading">
    <LazySkeletonSetting></LazySkeletonSetting>
  </section>
  <section v-else>
    <TabView v-model:activeIndex="active">
      <TabPanel>
        <template #header>
          <div class="flex-center min-w-max">
            <span class="span__element">Company Details</span>
          </div>
        </template>
        <RegularSettingsCompanyDetails></RegularSettingsCompanyDetails>
      </TabPanel>
      <TabPanel>
        <template #header>
          <div class="flex-center min-w-max">
            <span class="span__element">Payment Credentials</span>
          </div>
        </template>
        <RegularSettingsPaymentCredentials></RegularSettingsPaymentCredentials>
      </TabPanel>
    </TabView>
  </section>
</template>

<script setup>
const active = ref(0);
const loading = ref(false);
</script>
