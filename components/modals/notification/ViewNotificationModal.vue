<template>
  <div
    @click="toggleNotificationModal"
    class="flex justify-center fixed bottom-0 left-0 right-0 top-0 z-[1900] bg-[#000000bf] xl:bg-[#0000000f]"
  >
    <div
      @click.stop=""
      class="absolute z-50 flex flex-col gap-14 rounded-md bg-white p-4 mr-64 mt-28 h-[665px] min-w-[364px] lg:gap-3 -right-4 -top-7"
    >
      <div class="flex justify-between w-full bg-[#d4ecf4] p-2 rounded-md">
        <span
          class="bg-white p-2 w-1/2 rounded-md flex-center cursor-pointer hover:shadow-lg"
          @click="handleChangeTab('All')"
          >All</span
        >
        <span
          class="w-1/2 rounded-md flex-center cursor-pointer"
          @click="handleChangeTab('Unread')"
          >Unread</span
        >
      </div>
      <div class="flex flex-col gap-4 overflow-auto">
        <div
          class="flex gap-5 items-center border rounded-md p-2"
          v-for="(notification, index) in allNotifications"
          :key="index"
        >
          <div class="w-[50px] h-[50px] rounded-full flex-center">
            <img
              :src="notification.profilePic"
              class="w-full h-full rounded-full"
            />
          </div>
          <div class="flex flex-col justify-between p-2">
            <div class="flex items-center gap-2">
              <span class="span__element">{{ notification.user }}:</span>
              <span class="span__element text-gray-500">{{
                notification.content
              }}</span>
            </div>
            <span class="text-[#015D7B] span__element font-medium">{{
              notification.subject
            }}</span>
          </div>
          <Dropdown>
            <!-- dropdown trigger -->
            <template #trigger>
              <Button type="button" class="border-none self-start">
                <font-awesome-icon icon="ellipsis" />
              </Button>
            </template>

            <div class="flex flex-col">
              <Button
                icon="pi pi-eye"
                label="View"
                class="w-full border-none self-start !text-[#015D7B]"
              />
              <Button
                icon="pi pi-trash"
                label="Delete"
                class="w-full border-none self-start !text-[#015D7B]"
              />
            </div>
          </Dropdown>
        </div>
      </div>
      <div class="h-1/5 flex-center border-t pt-5">
        <Button
          label="Delete all"
          severity="secondary"
          outlined
          class="hover:shadow-xl w-3/5 !border-red-400 !bg-red-200 !text-gray-700"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Dropdown from "v-dropdown";

const props = defineProps({
  toggleNotificationModal: Function,
});

const notificationsList = ref([
  {
    profilePic: "https://xsgames.co/randomusers/avatar.php?g=male",
    user: "Shawn DeVries",
    subject: "PSI Trending Alert",
    content: "Set an Alert for A.J Beson. ",
    status: "read",
  },
  {
    profilePic: "https://xsgames.co/randomusers/avatar.php?g=male",
    user: "Shawn DeVries",
    subject: "PSI Trending Alert",
    content: "Set an Alert for A.J Beson. ",
    status: "unread",
  },
  {
    profilePic: "https://xsgames.co/randomusers/avatar.php?g=male",
    user: "Shawn DeVries",
    subject: "PSI Trending Alert",
    content: "Set an Alert for A.J Beson. ",
    status: "read",
  },
  {
    profilePic: "https://xsgames.co/randomusers/avatar.php?g=male",
    user: "Shawn DeVries",
    subject: "PSI Trending Alert",
    content: "Set an Alert for A.J Beson. ",
    status: "unread",
  },
  {
    profilePic: "https://xsgames.co/randomusers/avatar.php?g=male",
    user: "Shawn DeVries",
    subject: "PSI Trending Alert",
    content: "Set an Alert for A.J Beson. ",
    status: "read",
  },
  {
    profilePic: "https://xsgames.co/randomusers/avatar.php?g=male",
    user: "Shawn DeVries",
    subject: "PSI Trending Alert",
    content: "Set an Alert for A.J Beson. ",
    status: "unread",
  },
]);
const allNotifications = ref();
const currentTab = ref("All");

onMounted(() => {
  allNotifications.value = notificationsList.value;
});

const handleChangeTab = (tab) => {
  if (tab === "Unread") {
    allNotifications.value = notificationsList.value.filter(
      (notif) => notif.status === "unread"
    );
  } else {
    allNotifications.value = notificationsList.value;
  }
};
</script>
