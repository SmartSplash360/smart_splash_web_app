<template>
  <section class="flex flex-col gap-10">
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

const active = ref(0);
</script>
