<template>
  <div
    class="flex min-w-full flex-col gap-8 rounded-md bg-white dark:bg-[#31353F] dark:text-white"
  >
    <div class="flex items-center gap-4 text-[#025E7C]">
      <font-awesome-icon icon="chevron-left" @click="$router.back()" />
      <h2 class="heading__h2 font-bold text-[#025E7C]">
        Notifications
      </h2>
    </div>
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
    <div v-if="loading" class="h-full self-center flex-center w-10">
      <ProgressSpinner strokeWidth="8" />
    </div>
    <div
      v-else-if="allNotifications.length > 0"
      class="flex flex-col gap-4 overflow-auto"
    >
      <div
        class="flex gap-5 items-center border rounded-md p-2"
        v-for="(notification, index) in allNotifications"
        :key="index"
      >
        <div class="w-[50px] h-[50px] rounded-full flex-center">
          <img
            :src="user.photo ? customerPhoto : ProfileImage"
            class="w-full h-full rounded-full"
          />
        </div>
        <div class="flex flex-col justify-between p-2">
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <span class="span__element"
              >{{ notification.user.name }}
              {{ notification.user.surname }}:</span
            >
            <span class="span__element text-gray-500">{{
              notification.notification.subject
            }}</span>
          </div>
          <span class="text-[#015D7B] span__element font-medium">{{
            notification.notification.description
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
              @click="handleViewNotification(notification)"
            />
            <Button
              icon="pi pi-trash"
              label="Delete"
              class="w-full border-none self-start !text-[#015D7B]"
              @click="deleteNotification(notification.id)"
            />
          </div>
        </Dropdown>
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
</template>

<script setup>
import Dropdown from "v-dropdown";
import { useUserStore } from "~/stores/users";
import { useNotificationStore } from "~/stores/notification";
import ProfileImage from "@/assets/images/ProfilePlaceholder.png";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});

const notificationStore = useNotificationStore();
const userStore = useUserStore();

const router = useRouter();
const config = useRuntimeConfig();
const imageUrl = config.public.imageUrl;

const customerPhoto = ref();
const loading = ref(false);
const notificationsList = ref([]);
const allNotifications = ref([]);
const currentTab = ref("All");

const user = computed(() => userStore.getCurrentUser);
onMounted(async () => {
  loading.value = true;
  await notificationStore.fetchAllUnreadNotificationByUser(user.value.id);
  const res = await notificationStore.fetchAllNotificationByUser(user.value.id);
  notificationsList.value = res;
  allNotifications.value = res;

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
    currentTab.value = "All";
    allNotifications.value = notificationsList.value;
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
  await notificationStore.deleteUserNotification(id, user.value.id);
  await notificationStore.deleteNotification(id, user.value.id);
  props.toggleNotificationModal();
};
const deleteAllNotification = () => {
  allNotifications.value.forEach(async (notification) => {
    await notificationStore.deleteNotification(notification.id);
    await notificationStore.deleteUserNotification(notification.id);
  });
  props.toggleNotificationModal();
};
</script>
