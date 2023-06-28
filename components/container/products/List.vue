<template>
  <section v-if="loading">
    <SkeletonTableListing></SkeletonTableListing>
  </section>
  <section v-else class="flex flex-col gap-10">
    <div class="card">
      <TabView v-model:activeIndex="active">
        <TabPanel header="Products">
          <RegularProductList></RegularProductList>
        </TabPanel>
        <TabPanel header="Services">
          <RegularProductServiceList></RegularProductServiceList>
        </TabPanel>
      </TabView>
    </div>
  </section>
</template>

<script setup>
const loading = ref(false);
const active = ref(0);
</script>
