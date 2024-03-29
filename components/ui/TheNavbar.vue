<template>
  <div>
    <div
      class="desktop+ hidden min-h-[80px] w-full px-10 shadow-md lg:flex-between"
    >
      <ModalsLoaderScreen :loading="loading"></ModalsLoaderScreen>
      <div class="min-w-2/5 flex-between gap-3">
        <font-awesome-icon :icon="pageIcon" />
        <h1 class="heading__h3">{{ pageName }}</h1>
      </div>
      <div class="ml-auto flex-between">
        <div class="min-w-[400px] flex-between ml-14">
          <div
            class="bg-[#0291BF] text-white rounded-md dark:bg-[#1B2028] dark:border-[#1B2028]"
          >
            <SplitButton
              v-if="user?.role_id === 1"
              icon="pi pi-plus"
              :model="menuList"
            />
          </div>
          <button
            v-tooltip.top="
              $colorMode.value == 'dark' ? 'dark mode' : 'light mode'
            "
            @click="
              setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')
            "
          >
            <svg
              v-if="$colorMode.value == 'dark'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-gray-50"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <ModalsNotificationViewNotification
            v-if="showNotificationModal"
            :toggleNotificationModal="toggleNotificationModal"
          ></ModalsNotificationViewNotification>
          <span
            class="relative flex-between cursor-pointer"
            @click="handleNotification"
          >
            <font-awesome-icon icon="fa-regular fa-bell" class="text-4xl" />
            <span
              v-if="notificationCount"
              class="bg-red-500 rounded-full text-white p-1 w-[1.25rem] h-[1.25rem] flex-center absolute right-0 top-0 text-sm"
            >
              {{ notificationCount }}</span
            >
          </span>
          <span class="span__element font-light"
            >{{ user?.name }} {{ user?.surname || "" }}</span
          >
          <div class="flex items-center gap-2">
            <div class="rounded-full">
              <Avatar
                @contextmenu="onImageRightClick"
                aria-haspopup="true"
                :image="user?.photo ? userPhoto : userProfile"
                class="mr-2 min-w-[50px] min-h-[50px]"
                shape="circle"
              />
            </div>
            <div class="card flex justify-content-center">
              <span class="flex-center cursor-pointer">
                <font-awesome-icon
                  icon="chevron-down"
                  class="text-lg font-light ml-3"
                  @click="toggle"
                  aria-haspopup="true"
                  aria-controls="overlay_menu"
                />
              </span>
              <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
              <ContextMenu ref="menu" :model="items" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="mobile- sticky min-h-[70px] w-full items-center justify-between px-5 sm:shadow-md lg:hidden"
    >
      <div class="flex-between">
        <div class="h-[60px] max-h-[60px] bg-red-400">
          <img
            :src="SmartPlashLogo"
            alt="Smart-Splash-Logo"
            class="h-full w-full"
          />
        </div>
        <div class="flex-between gap-4">
          <button
            v-tooltip.top="
              $colorMode.value == 'dark' ? 'dark mode' : 'light mode'
            "
            @click="
              setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')
            "
          >
            <svg
              v-if="$colorMode.value == 'dark'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-gray-50"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <nuxt-link class="flex-center cursor-pointer" to="/notifications"
            ><font-awesome-icon :icon="['far', 'bell']" class="text-xl"
          /></nuxt-link>
          <div class="flex items-center gap-2">
            <Avatar
              :image="user?.photo ? userPhoto : userProfile"
              class="mr-2"
              size="xmedium"
              shape="circle"
            />
            <span @click="toggleSideBar" class="flex-center h-[30px] w-[30px]"
              ><font-awesome-icon icon="bars" class="cursor-pointer text-2xl"
            /></span>
          </div>
        </div>
      </div>
      <div v-if="sideBarVisible">
        <ul class="flex flex-col gap-2 text-white">
          <li
            v-for="link in menuListItem"
            @click="toggleSideBar"
            :key="link.name"
          >
            <nuxt-link
              :to="link?.url"
              class="flex cursor-pointer items-center gap-5 rounded-xl py-2 text-gray-600 dark:text-white"
            >
              <span class="flex-center h-[16px] w-[16px] span__element">
                <font-awesome-icon :icon="link?.icon" />
              </span>
              <span class="span__element">{{ link.name }}</span>
            </nuxt-link>
          </li>
          <li
            class="flex cursor-pointer items-center gap-5 rounded-xl py-2 text-gray-600 dark:text-white"
            @click="signout"
          >
            <span>
              <i class="pi pi-sign-out text-lg font-light" />
            </span>
            <span class="span__element">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import userProfile from "@/assets/images/ProfilePlaceholder.png";
import SmartPlashLogo from "@/assets/images/SmartSplash.png";
import {
  menuListAdmin,
  menuListCustomer,
  menuListTechnicina,
} from "@/utils/navbarLinks";
import { useUserStore } from "~/stores/users";
import { useMenuStore } from "~/stores/menu";
import { useNotificationStore } from "~/stores/notification";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useConfirm } from "primevue/useconfirm";

defineProps({
  setColorTheme: Function,
});

const config = useRuntimeConfig();
const imageUrl = config.public.imageUrl;

const route = useRoute();
const router = useRouter();
const confirm = useConfirm();
const userStore = useUserStore();
const menuStore = useMenuStore();
const notificationStore = useNotificationStore();

const menu = ref();
const menuList = ref();
const userPhoto = ref();
const loading = ref(false);
const sideBarVisible = ref(false);
const showNotificationModal = ref(false);
const items = ref([
  {
    label: "Logout",
    icon: "pi pi-sign-out",
    command: () => signout(),
  },
]);

const notificationCount = computed(
  () => notificationStore.getNotificationCount
);
const menuListItem = menuStore.getMenu;

const user = computed(() => userStore.getCurrentUser);
const pageName = computed(() => {
  let name = route.name;
  let routeName = name.split("-")[0];
  return routeName[0].toUpperCase() + routeName.slice(1);
});
const pageIcon = computed(() => {
  let name = route.name;
  let link = menuListItem.find((link) => link.name.toLowerCase() == name);
  return link?.icon ?? "user-lock";
});

onMounted(async () => {
  await notificationStore.fetchAllUnreadNotificationByUser(user.value.id);
  if (user.value.role_id === 1) {
    menuList.value = menuListAdmin;
  } else if (user.value.role_id === 2 || user.value.role_id === 3) {
    menuList.value = menuListCustomer;
    items.value.unshift({
      label: "My Profile",
      icon: "pi pi-user",
      command: () => {
        router.push("/customers/my-profile");
      },
    });
  } else if (user.value.role_id === 4) {
    menuList.value = menuListTechnicina;
    items.value.unshift({
      label: "My Profile",
      icon: "pi pi-user",
      command: () => {
        router.push("/technicians/my-profile");
      },
    });
  }

  if (user.value.photo) {
    if (user.value.photo?.includes("public/images/")) {
      let photo = user.value.photo.replace("public/images/", "/images/");
      userPhoto.value = `${imageUrl}/${photo}`;
    } else {
      userPhoto.value = user.value.photo;
    }
  }
});

const onImageRightClick = (event) => {
  menu.value.show(event);
};
const handleNotification = () => {
  showNotificationModal.value = true;
};

const toggleNotificationModal = () => (showNotificationModal.value = false);
const toggleSideBar = () => {
  sideBarVisible.value = !sideBarVisible.value;
};
const toggle = (event) => {
  menu.value.toggle(event);
};
const signout = () => {
  confirm.require({
    message: "Are you sure you want to logout?",
    accept: () => {
      loading.value = true;
      userStore.logout();
    },
  });
  loading.value = false;
};
</script>
