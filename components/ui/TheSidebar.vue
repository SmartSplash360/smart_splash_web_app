<template>
  <div
    class="hidden dark:bg-[#1B2028] dark:from-inherit h-full flex-col gap-[8rem] px-6 lg:flex 2xl:pb-20"
    :class="[$colorMode.value !== 'dark' && 'background-light']"
  >
    <div class="flex-center flex-col gap-5">
      <nuxt-link class="max-h-[150px] max-w-[298px]" to="/alerts">
        <img
          :src="SmartPlashLogo"
          alt="Smart-Splash-Logo"
          class="h-full w-full"
        />
      </nuxt-link>
      <button
        @click="handleToggleSide"
        class="self-center w-8 h-8 bg-[#707070] rounded-md text-white flex-center"
      >
        <font-awesome-icon v-if="toggleSide" icon="arrow-right" />
        <font-awesome-icon v-else icon="arrow-left" />
      </button>
    </div>

    <div class="flex-1 xl:-mt-14">
      <ul class="flex flex-col gap-5 text-white">
        <li v-for="link in menu" :key="link.name">
          <nuxt-link
            :to="link.url"
            :class="[
              $colorMode.value == 'dark'
                ? 'dark-router-link-active'
                : toggleSide
                ? 'flex-center '
                : null,
            ]"
            class="flex cursor-pointer items-center gap-5 rounded-lg px-5 py-3 nav-link-item hover:bg-[#d4ecf4] hover:text-black dark:text-[#FFFFFF] dark:hover:bg-[#0291BF] dark:hover:text-white"
          >
            <span
              class="flex-center nav-link-item"
              :class="toggleSide && 'text-xl'"
            >
              <font-awesome-icon
                :icon="link.icon"
                :class="!toggleSide && 'text-lg'"
              />
            </span>
            <span v-if="!toggleSide" class="nav-link-item">{{
              link.name
            }}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import SmartPlashLogo from "@/assets/images/SmartSplash.png";
import { useMenuStore } from "~/stores/menu";
import findFirstUniqueByName from "@/utils/filterMenuItem";

defineProps({
  toggleSide: Boolean,
  handleToggleSide: Function,
});

const router = useRouter();
const menuStore = useMenuStore();
const menu = ref();

const menuList = computed(() => menuStore.getMenu);

onMounted(async () => {
  menu.value = findFirstUniqueByName(menuList.value);
});
</script>

<style scoped>
.router-link-active {
  background-color: #fff;
  color: #000;
  font-size: 45px;
}
.dark-router-link-active .router-link-active {
  background-color: #fff;
}
.background-light {
  background: linear-gradient(360deg, #015d7b 76.44%, rgba(1, 93, 123, 0) 100%);
}
</style>
