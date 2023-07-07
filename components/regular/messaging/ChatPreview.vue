<template>
  <BaseSearchBar
    class="w-full self-center sm:w-11/12"
    @handleSearch="handleSearchChat"
  />
  <ul class="flex flex-col overflow-x-auto overflow-y-hidden sm:overflow-auto">
    <li
      v-for="chat in chatList"
      @click="$emit('select-chat',chat)"
      class="block sm:min-h-[150px] border-b  xl:min-h-[180px] lg:hidden dark:border-b-gray-600"
    >
      <div
        @click="handleChatView(chat.id)"
        class="hover:bg-[#D9D9D9] sm:h-full flex cursor-pointer items-center rounded-lg px-2 py-7 dark:hover:bg-[#1B2028] dark:rounded-none"
      >
        <img
          :src="chat.image"
          class="ml-5 h-[45px] w-[45px] rounded-full object-cover "
        />
        <div class="flex flex-col gap-2 px-5">
          <div class="flex w-full items-center justify-between">
            <h4 class="heading__h4">
              {{ chat.name }}
            </h4>
            <span class="span__element-small">
              {{ chat.time }} AM</span
            >
          </div>
          <span class="span__element">
            {{ chat.subject }}
          </span>
          <span class="max-h-[60px] overflow-hidden text-ellipsis span__element">
            {{ chat.message }}
          </span>
        </div>
      </div>
    </li>
    <li
      v-for="chat in chatList"
      @click="$emit('select-chat',chat)"
      class="hidden lg:block sm:min-h-[150px] border-b  xl:min-h-[180px] dark:border-b-gray-600" 
    >
      <div
        class="hover:bg-[#D9D9D9] sm:h-full flex cursor-pointer items-center rounded-lg px-2 py-4  sm:p-0 xl:py-0 dark:hover:bg-[#1B2028] dark:rounded-none"
      >
        <img
          :src="chat.image"
          class="ml-5 h-[45px] w-[45px] rounded-full object-cover xl:h-[65px] xl:w-[65px]"
        />
        <div    class="flex flex-col gap-2 px-5">
          <div class="flex w-full items-center justify-between">
            <h4 class="heading__h4">
              {{ chat.name }}
            </h4>
            <span class="span__element-small">
              {{ chat.time }} AM</span
            >
          </div>
          <span class="span__element ">
            {{ chat.subject }}
          </span>
          <span class="max-h-[45px] overflow-hidden text-ellipsis span__element-small dark:text-gray-400">
            {{ chat.message }}
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  chats: Array,
  path : String
});
const emits = defineEmits(['select-chat']);

const chatList = ref([...props.chats]);
const router = useRouter()

const handleSearchChat = (status) => {
  chatList.value = props.chats.filter((chat) =>
    chat.name.toLowerCase().includes(status.toLowerCase())
  );
};

const handleChatView = (inboxId) => {
  router.push("/"+ props.path+ "/"+ inboxId)
}
</script>
