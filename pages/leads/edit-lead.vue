<template>
  <div>
    <SkeletonEditMobilePages v-if="loading"></SkeletonEditMobilePages>
    <form
      v-else
      class="flex min-h-[500px] flex-col gap-12 rounded-md bg-white dark:bg-[#31353F]"
    >
      <div class="flex items-center gap-4 text-[#025E7C]">
        <nuxt-link to="/leads">
          <font-awesome-icon icon="chevron-left" />
        </nuxt-link>
        <h2 class="heading__h2 font-bold text-[#025E7C]">
          Edit Lead {{ leadId }}
        </h2>
      </div>
      <div class="flex flex-col gap-6">
        <div class="flex flex-col justify-between gap-6 sm:flex-row">
          <div class="flex w-full flex-col gap-3">
            <label class="span__element text-sm" for="name"> Name* </label>
            <InputText
              type="text"
              class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
              v-model="name"
            ></InputText>
          </div>
          <div class="flex w-full flex-col gap-3">
            <label class="span__element text-sm" for="name"> Surname* </label>
            <InputText
              type="text"
              class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
              v-model="surname"
            ></InputText>
          </div>
        </div>
        <div class="flex flex-col justify-between gap-6">
          <div class="flex w-full flex-col gap-3">
            <label class="span__element text-sm" for="email address">
              Email address*
            </label>
            <InputText
              type="email"
              class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
              v-model="email"
            ></InputText>
          </div>
          <div class="flex w-full flex-col gap-3">
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
      <div class="flex w-full flex-col gap-3">
        <label class="span__element" for="stage"> Select stage </label>

        <select
          name="stage"
          id="stage"
          v-model="stage"
          class="w-full lg:w-1/2 rounded-md border-gray-300"
        >
          <option disabled selected value="">Stage stage</option>
          <option value="1">Stage 1</option>
          <option value="2">Stage 2</option>
          <option value="3">Stage 3</option>
        </select>
      </div>
      <div class="flex flex-col gap-4">
        <label class="span__element text-sm" for="cell number"> Notes </label>
        <Textarea class="w-full" cols="30" rows="8" />
      </div>

      <div class="flex justify-end gap-5">
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          @click="cancel"
          class="hover:shadow-xl"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="!bg-[#0291BF] hover:shadow-xl text-white"
          @click="updateLead()"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { useLeadStore } from "~/stores/leads";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});

const store = useLeadStore();
const route = useRoute();
const router = useRouter();
const leadId = route.query.leadId;

const name = ref("");
const stage = ref();
const surname = ref("");
const email = ref("");
const phoneNumber = ref("");
const loading = ref(true);

onMounted(async () => {
  const lead = await store.fetchLead(leadId);
  name.value = lead.name;
  surname.value = lead.surname;
  email.value = lead.email;
  phoneNumber.value = lead.phone_number;
  stage.value = lead.status;
  loading.value = false;
});

const updateLead = async () => {
  try {
    const data = {
      name: name.value,
      surname: surname.value,
      email: email.value,
      phone_number: phoneNumber.value,
      status: stage.value,
    };

    await store.updateLead(leadId, data);
    await store.fetchLeads();

    router.push("/leads");
  } catch (e) {}
};

const cancel = () => {
  router.push("/leads");
};
</script>
