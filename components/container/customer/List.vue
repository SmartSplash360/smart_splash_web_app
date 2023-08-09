<template>
  <section v-if="loading">
    <SkeletonCustomer></SkeletonCustomer>
  </section>
  <section v-else class="-mx-5 lg:mx-0 flex flex-col lg:gap-10">
    <div class="hidden flex-wrap gap-5 lg:flex-between xl:gap-10">
      <RegularCustomerActivityInfo
        :routes="routes">
      </RegularCustomerActivityInfo>
      <div class="flex-1 flex justify-end">
        <BaseAddButton
          :btnText="'Add Customer'"
          @click="toggleAddCustomerModal"
        ></BaseAddButton>
      </div>
      <ModalsCustomerCreateCustomerModal
        v-if="addCustomerModal"
        :toggleAddCustomerModal="closeModal"
        :customer="customer"
      ></ModalsCustomerCreateCustomerModal>
    </div>
    <div class="flex flex-col gap-8 bg-[#0291BF] px-5 py-14 lg:hidden">
        <div class="flex-between gap-6">
            <div class="flex-1">
              <BaseSearchBar class="w-full" 
               @handleSearch="value => handleSearch(value)"/>
            </div>
            <span
              @click="showActiveRoute"
              class="flex-center h-[30px] w-[30px] cursor-pointer text-white "
              ><font-awesome-icon icon="bars" class="text-2xl" :class="[toggleActiveRoute && 'rotate-90']"
            /></span>
        </div>
        <div v-if="toggleActiveRoute" class="flex flex-col gap-2 lg:hidden">
          <RegularCustomerActivityCard           
            :loading="loading"
              :routes="routes">
          </RegularCustomerActivityCard>
        </div>
    </div>
    <RegularCustomerTable
      :editItem="editItem"
      :deleteItem="deleteItem"
      :customerMobiles="customerMobiles"
      :handleSort="handleSort"
    ></RegularCustomerTable>
  </section>
</template>

<script setup>
import {useToast} from "primevue/usetoast";
import {useConfirm} from "primevue/useconfirm";
import {useCustomerStore} from "~/stores/customer";

defineProps({
  loading : Boolean
})
const toast = useToast();
const confirm = useConfirm();
const customerStore = useCustomerStore();
const router = useRouter()

const addCustomerModal = ref(false);
const customer = ref()
const customerMobiles = ref()
const routes = reactive({
  activeRoute: 131,
  activeNoRoute: 41,
  inactive: 56,
  leads: 0,
});

const toggleActiveRoute = ref(false);

customerMobiles.value = customerStore.getCustomers;

const handleSearch = (value) => {
    customerStore.searchQuery = value
    customerMobiles.value = customerStore.filterCustomers(value);
}

const handleSort = () => {
    customerMobiles.value = customerStore.sortCustomers();
}
const showActiveRoute = () => {
  toggleActiveRoute.value = !toggleActiveRoute.value
};

const toggleAddCustomerModal = () => (addCustomerModal.value = true);

const closeModal = ({ success, error }) => {
  addCustomerModal.value = false
  customer.value = null

  if (success) {
    toast.add({ severity: 'success', summary: 'Customers', detail: success, life: 3000 });
  }

  if (error) {
    toast.add({ severity: 'error', summary: 'Customers', detail: `An error has occurred: ${error}`, life: 3000 });
  }
};

const editItem = ({ id, item, mobileEdit = false }) => {
  customer.value = item;
  if(mobileEdit){
    router.push({  
      path: '/customers/edit-customer',
      query: { customerId: id }
    });
    return 
  }
  toggleAddCustomerModal()
}

const deleteItem = async ({ id }) => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Delete Customer',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      // delete item
      try {
        const res = await customerStore.deleteCustomer(id)
        toast.add({ severity: 'info', summary: 'Delete Alert', detail: res?.message , life: 3000 });
      } catch (e) {
        toast.add({ severity: 'error', summary: 'Delete Alert', detail: `an error has occurred: ${e}`, life: 3000 });
      }
    },
    reject: () => {}
  })
}

</script>
