<template>
  <div class="flex flex-col gap-12">
    <div class="flex items-center gap-5">
      <div class="h-[120px] w-[120px] rounded-full">
        <Avatar
          :image="userProfile"
          class="mr-2 !h-full !w-full"
          shape="circle"
        />
      </div>
      <div class="flex flex-col gap-2">
        <h2 class="text-3xl font-[500] leading-9">Evan Kings</h2>
        <p class="text-md leading-4">Cleaning Tech</p>
      </div>
      <div class="ml-auto flex flex-1 justify-end">
        <Button label="View Reports" class="!bg-[#0291BF] hover:shadow-xl" />
      </div>
    </div>
    <RegularTechnicianStats></RegularTechnicianStats>
    <div class="flex flex-col gap-4">
      <RegularTechnicianDetailsTab
        @select-tab="switchTabs"
        :currentTab="currentTab"
      ></RegularTechnicianDetailsTab>
      <RegularTechnicianJobs
        v-if="currentTab === 'JOBS'"
      ></RegularTechnicianJobs>
      <RegularTechnicianQuotes
        v-else-if="currentTab === 'QUOTES'"
      ></RegularTechnicianQuotes>
      <RegularTechnicianFeedbacks v-else></RegularTechnicianFeedbacks>
    </div>
  </div>
</template>

<script setup>
import userProfile from "@/assets/images/profile_user.jpg";

const currentTab = ref("JOBS");

const switchTabs = (tab) => {
  if (tab) {
    currentTab.value = tab;
    return;
  }
};
</script>

<style lang="scss" scoped></style>
