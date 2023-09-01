<template>
  <div
    @click="toggleEditLeadModal({ show: false })"
    class="fixed bottom-0 left-0 right-0 top-0 z-[1200] flex-center bg-[#000000da]"
  >
    <form
      @click.stop
      class="flex min-h-[500px] flex-col gap-12 rounded-md bg-white p-10 lg:min-w-[950px] dark:bg-[#31353F]"
    >
      <h2 class="heading__h2 font-bold text-[#025E7C]">
        {{ lead ? "Edit" : "New" }} Lead {{ lead ? `#${lead?.id}` : "" }}
      </h2>

      <div class="flex gap-5">
        <div class="flex flex-col gap-2">
          <div class="flex flex-col justify-between gap-5 sm:flex-row">
            <div class="flex w-full flex-col gap-2">
              <label class="span__element text-sm" for="name"> Name* </label>
              <InputText
                type="text"
                class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
                v-model="name"
              ></InputText>
            </div>
            <div class="flex w-full flex-col gap-2">
              <label class="span__element text-sm" for="name"> Surname* </label>
              <InputText
                type="text"
                class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
                v-model="surname"
              ></InputText>
            </div>
          </div>
          <div class="flex flex-col justify-between gap-5">
            <div class="flex w-full flex-col gap-2">
              <label class="span__element text-sm" for="email address">
                Email address*
              </label>
              <InputText
                type="email"
                class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
                v-model="email"
              ></InputText>
            </div>
            <div class="flex w-full flex-col gap-2">
              <label class="span__element text-sm" for="cell number">
                Cell number
              </label>
              <InputText
                type="text"
                class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
                v-model="phoneNumber"
              ></InputText>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="span__element text-sm" for="cell number"> Notes </label>
          <Textarea class="w-full" cols="50" rows="8" />
        </div>
      </div>

      <div class="mt-5 flex flex-col justify-end gap-5 sm:flex-row">
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          @click="toggleEditLeadModal({ show: false })"
          class="hover:shadow-xl"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="!bg-[#0291BF] hover:shadow-xl text-white"
          @click="lead ? updateLead() : createLead()"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useLeadStore } from "~/stores/leads";

const store = useLeadStore();

const props = defineProps({
  toggleEditLeadModal: {
    type: Function,
    default: () => {},
    required: true,
  },
  lead: {
    type: Object,
    default: () => null,
    required: false,
  },
});

const name = ref("");
const surname = ref("");
const email = ref("");
const phoneNumber = ref("");
const password = ref("password");
const passwordConfirmation = ref("password");

onMounted(() => {
  if (props.lead) {
    name.value = props.lead.name;
    surname.value = props.lead.surname;
    email.value = props.lead.email;
    phoneNumber.value = props.lead.phone_number;
  }
});

const createLead = async () => {
  // TODO: add validation

  try {
    await store.createLead({
      name: name.value,
      surname: surname.value,
      email: email.value,
      phone_number: phoneNumber.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    });
    props.toggleEditLeadModal({ success: "Lead created successfully" });
  } catch (e) {
    props.toggleEditLeadModal({ error: e });
  }
};

const updateLead = async () => {
  try {
    const data = {
      name: name.value,
      surname: surname.value,
      email: email.value,
      phone_number: phoneNumber.value,
    };

    await store.updateLead(props.lead?.id, data);
    await store.fetchLeads();

    props.toggleEditLeadModal({
      success: `Lead ${props.lead?.id} updated successfully`,
    });
  } catch (e) {
    props.toggleEditLeadModal({ error: e });
  }
};
</script>
