<template>
  <section>
    <SkeletonEditTemplate v-if="loading"></SkeletonEditTemplate>
    <div
      v-else
      class="sm:gap-13 -mx-5 -my-6 flex min-h-screen flex-col gap-8 bg-[#f5fbfc] dark:bg-inherit lg:-mx-10 lg:-my-12"
    >
      <RegularCampaignEditTemplateControl
        :edit="edit"
      ></RegularCampaignEditTemplateControl>

      <RegularCampaignEditTemplate
        :campaignId="campaignId"
        :edit="edit"
        :createCampaign="createCampaign"
      ></RegularCampaignEditTemplate>
    </div>
  </section>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useTemplateStore } from "@/stores/templates";
import { useCampaignStore } from "@/stores/campaign";
import { useUserStore } from "~/stores/users";
import { useNotificationStore } from "~/stores/notification";

const toast = useToast();
const props = defineProps({
  campaignId: {
    type: String,
    default: () => null,
    required: false,
  },
  edit: {
    type: Boolean,
    default: () => false,
    required: false,
  },
});

const templateStore = useTemplateStore();
const campaignStore = useCampaignStore();
const notificationStore = useNotificationStore();

const loading = ref(true);
const template = ref();

const router = useRouter();
const route = useRoute();

const { templateId } = route.query;

const user = computed(() => userStore.getCurrentUser);

onMounted(() => {
  if (props.campaignId) {
    async () => {
      template.value = await templateStore.fetchTemplate(props.campaignId);
    };
  }
  loading.value = false;
});

const createCampaign = async (data) => {
  try {
    // check campaign type
    if (data.templateType === 2) {
      // check if lead
      if (data.lead) {
        await campaignStore.createCampaignEmail({
          title: data.name,
          role_id: 5,
          message: data.description,
          campaign_template_id: parseInt(data.templateId),
        });

        toast.add({
          severity: "info",
          summary: "Success",
          detail: "Email Campaign sent successfully to all Leads",
          life: 5000,
        });
      }
      if (data.customer) {
        await campaignStore.createCampaignEmail({
          title: data.name,
          role_id: 3,
          message: data.description,
          campaign_template_id: parseInt(data.templateId),
        });
        toast.add({
          severity: "info",
          summary: "Success",
          detail: "Email Campaign sent successfully to all Customers",
          life: 5000,
        });
      }
    } else if (data.templateType === 3) {
      // check if lead
      if (data.lead) {
        await campaignStore.createCampaignSMS({
          title: data.name,
          role_id: 5,
          message: data.description,
          campaign_template_id: data.templateId,
        });
        toast.add({
          severity: "info",
          summary: "Success",
          detail: "SMS Campaign sent successfully to all Leads",
          life: 5000,
        });
      }
      if (data.customer) {
        await campaignStore.createCampaignSMS({
          title: data.name,
          role_id: 3,
          message: data.description,
          campaign_template_id: data.templateId,
        });
        toast.add({
          severity: "info",
          summary: "Success",
          detail: "SMS Campaign sent successfully to all Customers",
          life: 5000,
        });
      }
    }

    router.push("/campaigns");
    await notificationStore.createNotification({
      subject: "CAMPAIGN CREATED",
      description: `Campaign sent to all ${
        data.lead && data.customer
          ? "Leads and Customers"
          : data.lead
          ? "Leads"
          : "Customers"
      }`,
      user_id: user.id,
      alert_id: "",
      type: "Campaign",
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error Message",
      detail: "An Error occured",
      life: 5000,
    });
  }
};
</script>
