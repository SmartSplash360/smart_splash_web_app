import {defineStore} from "pinia";
import axios from "axios";
import {useUserStore} from "~/stores/users";
import {tryCatch} from "standard-as-callback/built/utils";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export const useCustomerStore = defineStore("customer", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        customers: [],
    }),
    getters: {
        getCustomers(state) {
            return state.customers;
        },
        getCustomerById: (state) => (id: number | string) => {
            return state.customers.find((customer: Customer) => customer.id === id);
        }
    },
    actions: {
        async fetchCustomers() {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.get("http://localhost:8000/api/v1/customers");
                console.log(res.data.data.data);
                this.customers = res.data.data.data;
            } catch (error) {
                console.log(error);
                return error
            }
        },
        async fetchCustomer(id: number | string) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/customers/${id}`);
                console.log(res.data.data);
                return res.data.data as Customer;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async createCustomer(customerPayload: Object) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.post(`http://localhost:8000/api/v1/customers`, customerPayload);

                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                console.log(error)
                throw error
            }
        },
        async updateCustomer(id: number, customerPayload: Customer) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.post(`http://localhost:8000/api/v1/customers/${id}`, customerPayload);
                console.log(res.data);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
})