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
import { useCustomerStore } from "~/stores/customer";
import { useLeadStore } from "~/stores/leads";

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

const leadStore = useLeadStore();
const templateStore = useTemplateStore();
const campaignStore = useCampaignStore();
const customerStore = useCustomerStore();
const notificationStore = useNotificationStore();

const loading = ref(true);
const template = ref();

const router = useRouter();
const route = useRoute();

const { templateId } = route.query;

const user = computed(() => userStore.getCurrentUser);
const leads = computed(() => leadStore.getLeads);
const customers = computed(() => customerStore.getCustomers);

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

        leads.value.forEach(async (lead) => {
          const notification = await notificationStore.createNotification({
            subject: "New Email Campaign ",
            description: data.name,
            user_id: lead.id,
            alert_id: null,
            type: "Campaign",
          });

          await notificationStore.createUserNotification({
            user_id: lead.id,
            alert_id: null,
            notification_id: notification.id,
            notification_type: "Campaign",
            job_id: null,
          });
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
        customers.value.forEach(async (customer) => {
          const notification = await notificationStore.createNotification({
            subject: "New  Campaign ",
            description: data.name,
            user_id: customer.id,
            alert_id: null,
            type: "Campaign",
          });

          await notificationStore.createUserNotification({
            user_id: customer.id,
            alert_id: null,
            notification_id: notification.id,
            notification_type: "Campaign",
            job_id: null,
          });
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
        leads.value.forEach(async (lead) => {
          const notification = await notificationStore.createNotification({
            subject: "New SMS Campaign ",
            description: data.name,
            user_id: lead.id,
            alert_id: null,
            type: "Campaign",
          });

          await notificationStore.createUserNotification({
            user_id: lead.id,
            alert_id: null,
            notification_id: notification.id,
            notification_type: "Campaign",
            job_id: null,
          });
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
        customers.value.forEach(async (customer) => {
          await notificationStore.createNotification({
            subject: "New  Campaign ",
            description: data.name,
            user_id: customer.id,
            alert_id: null,
            type: "Campaign",
          });

          await notificationStore.createUserNotification({
            user_id: customer.id,
            alert_id: null,
            notification_id: notification.id,
            notification_type: "Campaign",
            job_id: null,
          });
        });
      }
    }

    router.push("/campaigns");
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
