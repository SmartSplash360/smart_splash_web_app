<template>
  <div
      @click="toggleCallModal({ show: false })"
      class="fixed bottom-0 left-0 right-0 top-0 z-[1200] flex items-center justify-center bg-[#000000da]">
    <form
        @click.stop
        class="flex min-h-[500px] flex-col gap-6 rounded-md bg-white p-10 lg:min-w-[950px] dark:bg-[#31353F]">
      <h2 class="heading__h2 font-bold text-[#025E7C]">
        Calling Lead #{{ lead?.id }}: {{ lead?.name }} {{ lead?.surname }}
      </h2>
      <div class="flex flex-col justify-center align-middle items-center gap-5">
        <img :src="lead?.photo" alt="Image" width="300" height="300" class="rounded-2xl"/>
        <div class="animate-ping text-base text-red-700 my-5">Ringing...</div>
      </div>
      <div class="flex flex-col justify-center gap-5 sm:flex-row">
        <div class="flex flex-col justify-center align-middle items-center">
          <Button rounded icon="pi pi-microphone" severity="secondary" class=""/>
          <div class="mt-3">Mute</div>
        </div>

        <div class="flex flex-col justify-center align-middle items-center">
          <Button rounded icon="pi pi-times" severity="danger" @click="endCall"/>
          <div class="mt-3">End</div>
        </div>

      </div>
    </form>
  </div>
</template>

<script setup>
import {useCommunicationStore} from "~/stores/communication";

const communicationStore = useCommunicationStore();

const props = defineProps({
  toggleCallModal: {
    type: Function,
    default: () => {},
    required: true
  },
  lead: {
    type: Object,
    default: () => null,
    required: false
  }
});

onMounted(async () => {
  await startCall()
})

const startCall = async () => {
  console.log('start call')
  // props.lead?.phone_number
 const sid = await communicationStore.startVoiceCall('+27842172527')
}

const endCall = () => {
  console.log('end call')
  props.toggleCallModal({show: false})
}
</script>