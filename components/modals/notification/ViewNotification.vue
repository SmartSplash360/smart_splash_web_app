<template>
  <div
    @click="toggleNotificationModal"
    class="flex justify-center fixed bottom-0 left-0 right-0 top-0 z-[1900] bg-[#000000bf] xl:bg-[#0000000f]"
  >
    <div
      @click.stop=""
      class="absolute z-50 flex flex-col gap-14 rounded-md bg-white dark:bg-[#1B2028] p-4 mr-64 mt-28 w-[450px] lg:gap-3 -right-4 -top-7"
      :class="allNotifications.length > 0 ? 'h-[465px]  ' : 'h-[200px]'"
    >
      <div class="flex justify-between w-full bg-[#d4ecf4] p-2 rounded-md">
        <span
          class="p-2 w-1/2 rounded-md flex-center cursor-pointer"
          :class="currentTab === 'All' && 'bg-white'"
          @click="handleChangeTab('All')"
          >All
        </span>
        <span
          class="w-1/2 rounded-md flex-center cursor-pointer"
          :class="currentTab === 'Unread' && 'bg-white'"
          @click="handleChangeTab('Unread')"
          >Unread</span
        >
      </div>
      <div v-if="loading" class="h-full self-center flex-center w-10">
        <ProgressSpinner strokeWidth="8" />
      </div>
      <div
        v-else-if="allNotifications.length > 0"
        class="h-full flex flex-col gap-4 overflow-auto"
      >
        <div
          class="flex gap-5 items-center justify-between border rounded-md p-2 cursor-pointer hover:shadow-xl hover:bg-slate-100"
          v-for="(notification, index) in allNotifications"
          :key="index"
          @click="handleViewNotification(notification)"
        >
          <div class="rounded-full flex-center gap-2 self-start">
            <img
              :src="user.photo ? customerPhoto : ProfileImage"
              class="w-10 h-10 rounded-full"
            />
          </div>

          <div class="flex flex-col justify-between p-2">
            <div class="flex items-center gap-2">
              <span class="span__element font-bold text-xs uppercase"
                >{{ notification.notification.type }}:</span
              >
              <span class="span__element text-gray-500">{{
                notification.notification.subject
              }}</span>
            </div>
            <span class="text-[#015D7B] span__element font-medium">{{
              notification.notification.description
            }}</span>
          </div>
          <Button
            icon="pi pi-trash"
            class="w-full border-none !text-red-500"
            @click="deleteNotification(notification.id)"
          />
        </div>
      </div>
      <div v-else class="flex-center pt-5">
        You have 0 notifications
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
import ProfileImage from "@/assets/images/ProfilePlaceholder.png";

const notificationStore = useNotificationStore();
const userStore = useUserStore();

const props = defineProps({
  notifications: Array,
  unreadNotifications: Array,
  toggleNotificationModal: Function,
});

const router = useRouter();
const config = useRuntimeConfig();
const imageUrl = config.public.imageUrl;

const customerPhoto = ref();
const refreshFlag = ref(false);

const loading = ref(false);
const notifications = ref([]);
const notificationsList = ref([]);
const allNotifications = ref([]);
const currentTab = ref("All");

const user = computed(() => userStore.getCurrentUser);

const refreshInterval = setInterval(() => {
  // Toggle the refresh flag
  refreshFlag.value = !refreshFlag.value;
}, 1 * 60 * 1000);

onBeforeUnmount(() => {
  clearInterval(refreshInterval);
});

onMounted(async () => {
  loading.value = true;
  notificationsList.value = props.notifications;
  allNotifications.value = props.notifications;

  if (user.value?.photo) {
    if (user.value.photo?.includes("public/images/")) {
      let photo = user.value.photo.replace("public/images/", "/images/");
      customerPhoto.value = `${imageUrl}/${photo}`;
    } else {
      customerPhoto.value = user.value.photo;
    }
  }
  loading.value = false;
});

const handleChangeTab = (tab) => {
  if (tab === "Unread") {
    currentTab.value = "Unread";
    allNotifications.value = notificationsList.value.filter(
      (notif) => notif.is_read === 0
    );
  } else {
    allNotifications.value = notificationsList.value;
    currentTab.value = "All";
  }
};
const handleViewNotification = (notification) => {
  notificationStore.updateUserNotification(notification.id, { is_read: 1 });
  if (notification.notification.type.toLowerCase() == "alert") {
    window.location.href = "/alerts";
    props.toggleNotificationModal();
  }
  if (notification.notification.type.toLowerCase() === "job") {
    window.location.href = "/technicians/my-profile";
  }
  if (notification.notification.type.toLowerCase() == "campaign") {
    window.location.href = "/campaigns";
    props.toggleNotificationModal();
  }
  if (notification.notification.type.toLowerCase() == "customer") {
    window.location.href = "/customers/my-profile";
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
