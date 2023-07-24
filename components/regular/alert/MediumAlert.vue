<template>
  <div class="alert-table hidden lg:flex flex-col gap-10 dark:text-white">
      <DataTable
          :value="alerts"
          dataKey="id"
          :rows="10"
          :loading="loading"
      >
        <template #empty> No alerts found. </template>
        <Column
            field="id"
            header="Alert"
            sortable
        ></Column>
        <Column
            field="name"
            header="Customer name"
            sortable
        >
          <template #body="slotProps">
            {{ slotProps.data?.body_of_water?.customer?.name }}
            {{ slotProps.data?.body_of_water?.customer?.surname ?? '' }}
          </template>
        </Column>
        <Column
            field="description"
            header="Address"
        >
          <template #body="slotProps">
            {{ slotProps.data?.body_of_water?.customer?.address[0]?.address_line1 }}
          </template>
        </Column>
        <Column
            field="alert_type_id"
            header="Alert type"
            sortable
        >
          <template #body="slotProps">
            {{ slotProps.data?.alert_type?.name }}
          </template>
        </Column>
        <Column
            field="price"
            header="Technician"
        >
          <template #body="slotProps">
            {{ slotProps.data?.technician?.name ?? `Technician ${slotProps.data.technician}` }}
          </template>
        </Column>
        <Column
            field="status"
            header="Status"
            sortable
        >
          <template #body="slotProps">
            <Tag :value="slotProps.data?.status"
                 :severity="slotProps.data?.status === 'open' ? 'success': 'danger'"/>
          </template>
        </Column>
      </DataTable>
  </div>
  <div class="alert-accordion card flex flex-col gap-5 lg:hidden">
      <div class="flex-between bg-[#025E7C] py-5 px-5 text-white">
        <h5 class="heading__h5 flex-1">Alert</h5>
        <h5 class="heading__h5 flex-1 flex justify-start">Customer</h5>
      </div>
      <div v-if="alertCount == 0" class="flex-center">
        <h5 class="heading__h5">
          There is no alert
        </h5>
      </div>
      <Accordion v-else :activeIndex="0">
          <AccordionTab v-for="alert in alerts" :key="alert.id" >
          <template #header>
            <div class="flex-between w-full dark:text-white">
              <span class="flex-1 paragraph__p">{{ alert.alert_type?.name }}</span>
              <span class="flex-1 paragraph__p">{{ alert.body_of_water?.customer?.name  }}</span>
              <span>
                <Button type="button"  @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" class="border-none">
                  <font-awesome-icon icon="ellipsis-vertical" />
                </Button>
                <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" class="bg-white dark:bg-[#1B2028] text-black dark:text-white"/>
                <!-- <Toast /> -->
              </span>
            </div>
          </template>
          <div class="flex flex-col dark:text-white bg-[#d4ecf4] dark:bg-[#1B2028]">
            <div class="flex-between px-4 py-2 rounded-md">
              <span class="text-gray-500 span__element flex-1">Address</span>
              <span class="text-xs flex-1 flex justify-start">{{alert.body_of_water?.customer?.address[0]?.address_line1 }}</span>
            </div>
            <div class="flex-between px-4 py-2 rounded-md">
              <span class="text-gray-500 span__element flex-1">Pool name</span>
              <span class="text-xs flex-1 flex justify-start">{{alert.alert_type?.name}}</span>
            </div>
            <div class="flex-between px-4 py-2 rounded-md">
              <span class="text-gray-500 span__element flex-1">Technician Responsible</span>
              <span class="text-xs flex-1 flex justify-start">{{alert.technician?.name }}</span>
            </div>
          </div>
          </AccordionTab>
      </Accordion>
  </div>
</template>

<script setup>
import Tag from "primevue/tag";

const props = defineProps({
  alerts: {
    type: Array,
    default: () => [],
  },
});

const alertCount = computed(() => props.alerts.length);

onMounted(async () => {
  loading.value = false;
});

const menu = ref();
  const items = ref([
          {
              label: 'View Alert',
              icon: 'pi pi-eye',
              command: () => viewAlert()
          },
          {
              label: 'Delete Template',
              icon: 'pi pi-trash',
              command: () => {
                deleteAlert(props.template.id)
                router.push('/alerts')
              }
          }
  ]);
  const toggle = (event) => {
      menu.value.toggle(event);
  };

  const viewAlert = () => {}
  const deleteAlert = () => {}
const loading = ref(true);
</script>