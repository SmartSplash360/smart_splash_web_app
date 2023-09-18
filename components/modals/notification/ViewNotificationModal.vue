<template>
  <div
    @click="toggleNotificationModal"
    class="flex justify-center fixed bottom-0 left-0 right-0 top-0 z-[1900] bg-[#000000bf] xl:bg-[#0000000f]"
  >
    <div
      @click.stop=""
      class="absolute z-50 flex flex-col gap-14 rounded-md bg-white p-4 mr-64 mt-28 h-[665px] w-[450px] lg:gap-3 -right-4 -top-7"
    >
      <div class="flex justify-between w-full bg-[#d4ecf4] p-2 rounded-md">
        <span
          class="p-2 w-1/2 rounded-md flex-center cursor-pointer"
          :class="currentTab === 'All' && 'bg-white'"
          @click="handleChangeTab('All')"
          >All</span
        >
        <span
          class="w-1/2 rounded-md flex-center cursor-pointer"
          :class="currentTab === 'Unread' && 'bg-white'"
          @click="handleChangeTab('Unread')"
          >Unread</span
        >
      </div>
      <div class="h-full flex flex-col gap-4 overflow-auto">
        <div
          class="flex gap-5 items-center justify-between border rounded-md p-2 cursor-pointer hover:shadow-xl hover:bg-slate-100"
          v-for="(notification, index) in allNotifications"
          :key="index"
          @click="handleViewNotification(notification)"
        >
          <div class="hidden w-[50px] h-[50px] rounded-full flex-center">
            <img
              :src="notification.profilePic"
              class="w-full h-full rounded-full"
            />
          </div>
          <div class="flex flex-col justify-between p-2">
            <div class="flex items-center gap-2">
              <span class="span__element font-bold text-xs uppercase"
                >{{ notification.type }}:</span
              >
              <span class="span__element text-gray-500">{{
                notification.subject
              }}</span>
            </div>
            <span class="text-[#015D7B] span__element font-medium">{{
              notification.description
            }}</span>
          </div>
          <Button
            icon="pi pi-trash"
            class="w-full border-none !text-red-500"
            @click="deleteNotification(notification.id)"
          />
        </div>
      </div>
      <div class="h-1/5 flex-center border-t pt-5">
        <Button
          label="Delete all"
          severity="secondary"
          outlined
          class="hover:shadow-xl w-3/5 !border-red-400 !bg-red-200 !text-gray-700"
          @click="deleteAllNotification"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Dropdown from "v-dropdown";
import { useUserStore } from "~/stores/users";
import { useNotificationStore } from "~/stores/notification";

const notificationStore = useNotificationStore();

const props = defineProps({
  toggleNotificationModal: Function,
});

const router = useRouter();

const notifications = ref([]);
const notificationsList = ref([]);
const allNotifications = ref();
const currentTab = ref("All");

onMounted(async () => {
  await notificationStore.fetchNotifications();
  notificationsList.value = notificationStore.getNotifications;
  allNotifications.value = notificationsList.value;
});

const handleChangeTab = (tab) => {
  if (tab === "Unread") {
    currentTab.value = "Unread";
    allNotifications.value = notificationsList.value.filter(
      (notif) => notif.status === "unread"
    );
  } else {
    allNotifications.value = notificationsList.value;
    currentTab.value = "All";
  }
};

const handleViewNotification = (notification) => {
  if (notification.type.toLowerCase() == "Alert") {
    router.push("/alerts");
    props.toggleNotificationModal();
  }
  // Get Customer details
  // if (notification.type.toLowerCase() === "job") {
  //   router.push("/alerts");
  // }
  if (notification.type.toLowerCase() == "Campaign") {
    router.push("/campaigns");
    props.toggleNotificationModal();
  }
  if (notification.type.toLowerCase() == "Customer") {
    router.push("/customers");
    props.toggleNotificationModal();
  }
};
const deleteNotification = async (id) => {
  await notificationStore.deleteNotification(id);
  props.toggleNotificationModal();
};

const deleteAllNotification = () => {
  allNotifications.value.forEach(async (notification) => {
    await notificationStore.deleteNotification(notification.id);
  });
  props.toggleNotificationModal();
};
</script>
