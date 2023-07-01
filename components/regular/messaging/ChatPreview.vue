<template>
  <BaseSearchBar
    class="w-full self-center sm:w-11/12"
    @handleSearch="handleSearchChat"
  />
  <ul class="flex flex-col overflow-x-auto overflow-y-hidden sm:overflow-auto">
    <li
      v-for="chat in chatList"
      @click="$emit('select-chat',chat)"
      class="block sm:min-h-[150px] border-b xl:min-h-[180px] lg:hidden"
    >
      <div

        @click="handleChatView(chat.id)"
        class="flex cursor-pointer items-center rounded-lg px-2 py-4 hover:bg-[#D9D9D9] sm:h-full sm:bg-white sm:p-0 "
      >
        <img
          :src="chat.image"
          class="ml-5 h-[45px] w-[45px] rounded-full object-cover "
        />
        <div    class="flex flex-col gap-2 px-5">
          <div class="flex w-full items-center justify-between">
            <h4 class=" text-sm font-[500] text-gray-700">
              {{ chat.name }}
            </h4>
            <span class="text-[8px] text-gray-700 ">
              {{ chat.time }} AM</span
            >
          </div>

          <span class="text-[10px] text-xs font-bold xl:text-sm">
            {{ chat.subject }}
          </span>
          <span class="max-h-[60px] overflow-hidden text-ellipsis text-sm">
            {{ chat.message }}
          </span>
        </div>
      </div>
    </li>
    <li
      v-for="chat in chatList"
      @click="$emit('select-chat',chat)"
      class="hidden lg:block sm:min-h-[150px] border-b xl:min-h-[180px]"
    >
      <div
        class="flex cursor-pointer items-center rounded-lg px-2 py-4 hover:bg-[#D9D9D9] sm:h-full sm:bg-white sm:p-0 xl:py-0"
      >
        <img
          :src="chat.image"
          class="ml-5 h-[45px] w-[45px] rounded-full object-cover xl:h-[65px] xl:w-[65px]"
        />
        <div    class="flex flex-col gap-2 px-5">
          <div class="flex w-full items-center justify-between">
            <h4 class="xl:text-md text-sm font-[500] text-gray-700">
              {{ chat.name }}
            </h4>
            <span class="text-[8px] text-gray-700 xl:text-[10px]">
              {{ chat.time }} AM</span
            >
          </div>
          <span class="text-[10px] text-xs font-bold xl:text-sm">
            {{ chat.subject }}
          </span>
          <span class="max-h-[60px] overflow-hidden text-ellipsis text-sm">
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
