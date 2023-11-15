<template>
  <section v-if="loading">
    <SkeletonCampaignPage></SkeletonCampaignPage>
  </section>
  <section
    v-else
    class="-mx-5 -my-6 lg:-mx-10 lg:-my-12 sm:gap-13 px-5 lg:px-10 lg:py-12 flex flex-col gap-16 bg-[#f5fbfc] dark:bg-inherit min-h-screen"
  >
    <RegularCampaignBoard
      @search-template="(value) => handleSearch(value)"
      @select-type="(value) => handleSelectType(value)"
    >
    </RegularCampaignBoard>
    <div class="flex flex-col gap-10" v-if="count > 0">
      <div class="card-container grid items-center justify-between">
        <RegularCampaignTemplateCard
          v-for="template in templates"
          :key="template.id"
          :template="template"
          :campaignType="type"
        ></RegularCampaignTemplateCard>
      </div>
      <div v-if="totalPage > 0" class="flex justify-center gap-5 mt-14">
        <span
          class="flex-center rounded-full w-12 h-12 text-sm text-[#646c73]"
          :class="
            currentPage > 1 &&
            'w-12 h-12 cursor-pointer text-[#11799c] hover:bg-[#e9ecef] hover:border'
          "
          @click="handlePrevious"
        >
          <font-awesome-icon icon="chevron-left"></font-awesome-icon>
        </span>
        <span
          v-for="pageNumber in totalPage"
          :key="pageNumber"
          class="flex-center rounded-full w-12 h-12 text-sm text-[#646c73] cursor-pointer"
          :class="
            pageNumber === currentPage
              ? 'w-12 h-12 bg-[#eef2ff] text-[#11799c] border'
              : 'hover:bg-[#e9ecef] hover:border'
          "
          @click="handleRequestPage(pageNumber)"
          >{{ pageNumber }}</span
        >
        <span
          class="flex-center rounded-full w-12 h-12 text-sm text-[#646c73]ß"
          :class="
            currentPage < totalPage &&
            'w-12 h-12 cursor-pointer text-[#11799c] hover:bg-[#e9ecef] hover:border'
          "
          @click="handleNext"
        >
          <font-awesome-icon icon="chevron-right"></font-awesome-icon>
        </span>
      </div>
    </div>
    <div v-else>
      <p class="paragraph__p">No Template available</p>
    </div>
  </section>
</template>

<script setup>
import { useTemplateStore } from "@/stores/templates";

const store = useTemplateStore();
const templates = ref();
const count = computed(() => store.getTemplateCount);

const type = ref(2);
const pageNumber = ref(1);
const totalPage = ref();
const loading = ref(false);
const currentPage = ref(1);

const templateList = computed(() => store.getTemplates);

onMounted(async () => {
  loading.value = true;
  await store.fetchTemplates();
  templates.value = templateList.value;
  totalPage.value = Math.ceil(count.value / 15);
  loading.value = false;
});

const handleRequestPage = async (page) => {
  pageNumber.value = page;
  currentPage.value = page;
  await store.fetchTemplates(page);
  templates.value = store.getTemplates;
};
const handlePrevious = async () => {
  if (currentPage.value >= 2 && currentPage.value <= totalPage.value) {
    currentPage.value = currentPage.value - 1;
    await store.fetchTemplates(currentPage.value);
    templates.value = store.getTemplates;
  }
};
const handleNext = async () => {
  if (currentPage.value < totalPage.value) {
    currentPage.value = currentPage.value + 1;
    await store.fetchTemplates(currentPage.value);
    templates.value = store.getTemplates;
  }
};

const handleSelectType = (value) => {
  type.value = value;

  if (value === 2) {
    templates.value = store.getTemplateTypeEmail;
  } else if (value === 3) {
    templates.value = store.getTemplateTypeSMS;
  } else {
    templates.value = store.getTemplates;
  }
};
const handleSearch = (value) => {
  store.searchQuery = value;
  templates.value = store.filteredTemplates(value);
};
</script>

<style scoped>
.card-container {
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  row-gap: 80px;
  column-gap: 50px;
}
@media (min-width: 1444px) {
  .card-container {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    row-gap: 50px;
    column-gap: 30px;
  }
}
</style>
