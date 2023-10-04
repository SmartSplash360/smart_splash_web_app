<template>
  <div
    @click="handleToggleShowComment"
    class="flex-center lg:fixed lg:bottom-0 lg:left-0 lg:right-0 lg:top-0 lg:z-[1200] lg:bg-[#000000aa]"
  >
    <form
      @click.stop=""
      class="flex flex-col rounded-md bg-white p-10 lg:min-h-fit lg:min-w-[687px] lg:gap-5"
    >
      <div class="flex-between w-full">
        <h3 class="heading__h3 text-[#025E7C]">
          All Comments
        </h3>
        <div class="flex items-center gap-4">
          <Avatar
            :image="
              jobDetails.customerProfile || 'https://plchldr.co/i/500x2500'
            "
            :alt="jobDetails.customerName"
            size="medium"
            shape="circle"
          />
          <p class="paragraph__p font-bold">{{ jobDetails.customerName }}</p>
        </div>
      </div>
      <div class="flex flex-col border shadow-sm rounded-md p-4">
        <div class="flex flex-col gap-4">
          <p class="paragraph__p text-gray-400">{{ createdDate }}</p>
          <p class="paragraph__p">{{ jobDetails.comments }}</p>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  handleToggleShowComment: Function,
  jobDetails: Object,
});

const createdDate = computed(() => {
  const dateObj = new Date(props.jobDetails.created_at);

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>
