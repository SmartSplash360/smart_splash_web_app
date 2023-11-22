<template>
  <section>
    <SkeletonTableListing v-if="loading"></SkeletonTableListing>
    <div v-else class="flex py-10 lg:py-0 flex-col lg:gap-10">
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
    </div>
  </section>
</template>

<script setup>
defineProps({
  loading: Boolean,
});
const active = ref(0);
</script>
