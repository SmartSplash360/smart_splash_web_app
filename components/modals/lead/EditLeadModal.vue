<template>
  <div
    @click="toggleEditLeadModal({ show: false })"
    class="fixed bottom-0 left-0 right-0 top-0 z-[1200] flex-center bg-[#000000da]"
  >
    <div v-if="loading" class="card self-center flex-center w-10">
      <ProgressSpinner strokeWidth="8" />
    </div>
    <form
      v-else
      @click.stop
      class="flex min-h-[500px] flex-col gap-10 rounded-md bg-white p-8 lg:min-w-[950px] dark:bg-[#31353F]"
    >
      <h2 class="heading__h2 font-bold text-[#025E7C]">
        {{ lead ? "Edit" : "New" }} Lead {{ lead ? `#${lead?.id}` : "" }}
      </h2>

      <div class="flex flex-col gap-8">
        <div class="flex flex-col justify-between gap-5 sm:flex-row">
          <div class="flex w-full flex-col gap-2">
            <label class="span__element text-sm" for="name"> Name* </label>
            <InputText
              type="text"
              v-model="name"
              class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
              :class="errorName && 'border-red-300'"
              @blur="handleChangeName"
            ></InputText>
            <p class="min-h-[20px]">
              <span v-show="errorName" class="text-[#D42F24] text-xs">{{
                errorName
              }}</span>
            </p>
          </div>
          <div class="flex w-full flex-col gap-2">
            <label class="span__element text-sm" for="name"> Surname* </label>
            <InputText
              type="text"
              v-model="surname"
              class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
              :class="errorSurname && 'border-red-300'"
              @blur="handleChangeSurname"
            ></InputText>
            <p class="min-h-[20px]">
              <span v-show="errorSurname" class="text-[#D42F24] text-xs">{{
                errorSurname
              }}</span>
            </p>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row justify-between gap-5">
          <div class="w-full flex flex-col gap-2">
            <label class="span__element text-sm" for="email address">
              Email address*
            </label>
            <InputText
              type="email"
              v-model="email"
              class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
              :class="errorEmail && 'border-red-300'"
              @blur="handleChangeEmail"
            ></InputText>
            <p class="min-h-[20px]">
              <span v-show="errorEmail" class="text-[#D42F24] text-xs">{{
                errorEmail
              }}</span>
            </p>
          </div>
          <div class="w-full flex flex-col gap-2">
            <label class="span__element text-sm" for="cell number">
              Cell number
            </label>
            <InputText
              type="text"
              v-model="phoneNumber"
              class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
              :class="errorPhoneNumber && 'border-red-300'"
              @blur="handleChangePhoneNumber"
            ></InputText>
            <p class="min-h-[20px]">
              <span v-show="errorPhoneNumber" class="text-[#D42F24] text-xs">{{
                errorPhoneNumber
              }}</span>
            </p>
          </div>
        </div>
        <div class="flex w-full flex-col gap-3">
          <label class="span__element" for="stage"> Select stage </label>

          <select
            name="stage"
            id="stage"
            v-model="stage"
            class="w-full lg:w-1/2 rounded-md border-gray-300"
          >
            <option>Select stage</option>
            <option value="1">Stage 1</option>
            <option value="2">Stage 2</option>
            <option value="3">Stage 3</option>
          </select>
        </div>
        <div class="flex flex-col gap-4">
          <label class="span__element text-sm" for="cell number">
            Notes (10 to 300 characters)
          </label>
          <Textarea
            v-model="notes"
            cols="50"
            rows="5"
            class="w-full"
            :class="errorNotes && 'border-red-300'"
            @blur="handleChangeNote"
          />
          <p class="min-h-[20px]">
            <span v-show="errorNotes" class="text-[#D42F24] text-xs">{{
              errorNotes
            }}</span>
          </p>
        </div>
      </div>

      <div class="flex flex-col justify-end gap-5 sm:flex-row">
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

const {
  useValidateEmail,
  useValidatePhoneNumber,
  useRequired,
  useValidateTextArea,
} = useValidation();

const name = ref("");
const surname = ref("");
const email = ref("");
const stage = ref();
const notes = ref("");
const phoneNumber = ref("");
const loading = ref(false);

const errorNotes = ref();
const errorName = ref("");
const errorSurname = ref("");
const errorEmail = ref("");
const errorPhoneNumber = ref("");

onMounted(() => {
  loading.value = true;
  if (props.lead) {
    name.value = props.lead.name;
    surname.value = props.lead.surname;
    email.value = props.lead.email;
    phoneNumber.value = props.lead.phone_number;
    stage.value = props.lead.status;
    notes.value = props.lead.notes;
  }
  loading.value = false;
});

const handleChangeName = () => {
  errorName.value = useRequired({
    fieldname: "name",
    field: name.value,
    error: errorName.value,
  });
};
const handleChangeSurname = () => {
  errorSurname.value = useRequired({
    fieldname: "surname",
    field: surname.value,
    error: errorSurname.value,
  });
};
const handleChangeEmail = () => {
  errorEmail.value = useValidateEmail({
    email: email.value,
    error: errorEmail.value,
  });
};
const handleChangePhoneNumber = () => {
  errorPhoneNumber.value = useValidatePhoneNumber({
    phoneNumber: phoneNumber.value,
    error: errorPhoneNumber.value,
  });
};

const handleChangeNote = () => {
  errorNotes.value = useValidateTextArea({
    field: notes.value,
    error: errorNotes.value,
  });
};

const validateForm = () => {
  handleChangeName();
  handleChangeSurname();
  handleChangeEmail();
  handleChangePhoneNumber();
  return (
    !errorName.value &&
    !errorSurname.value &&
    !errorEmail.value &&
    !errorPhoneNumber.value
  );
};
const createLead = async () => {
  if (validateForm()) {
    loading.value = true;
    try {
      await store.createLead({
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone_number: phoneNumber.value,
      });
      loading.value = false;
      props.toggleEditLeadModal({ success: "Lead created successfully" });
      await store.fetchLeads();
    } catch (e) {
      loading.value = false;
      props.toggleEditLeadModal({ error: e });
    }
  }
};

const updateLead = async () => {
  if (validateForm()) {
    loading.value = true;
    try {
      await store.updateLead(props.lead?.id, {
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone_number: phoneNumber.value,
        status: stage.value,
      });
      await store.fetchLeads();
      loading.value = false;
      props.toggleEditLeadModal({
        success: `Lead ${props.lead?.id} updated successfully`,
      });
    } catch (e) {
      loading.value = false;
      props.toggleEditLeadModal({ error: e });
    }
  }
};
</script>
