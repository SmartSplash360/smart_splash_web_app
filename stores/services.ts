import {defineStore} from "pinia";
import axios from "axios";
import {useUserStore} from "~/stores/users";
import {useTenantStore} from "~/stores/tenants";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';


export const useServiceStore = defineStore("service", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        services: [],
        createdServiceId : null
    }),
    getters: {
        getServices(state) {
            return state.services
        },
        getServiceId: (state) => (id: number | string) => {
            return state.services.find((service: Service) => service.id === id);
        },
    },
    actions: {
        async fetchServices() {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/services` : `http://localhost:8000/api/v1/services`
            try {
                const res = await axios.get(url);
                this.services = res.data.data.data
            } catch (error) {
                console.log(error);
            }
        },
        async fetchService(id: number) {
            try {
                const jwt = useUserStore().getJwt;
                axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
                let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/services/${id}` : `http://localhost:8000/api/v1/services/${id}`
                const res = await axios.get(url);
                return res.data.data
            } catch (error) {
                console.log(error);
            }
        },
        async createService(servicePayload: Service) {
            try {
                const jwt = useUserStore().getJwt;
                axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
                let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/services` : `http://localhost:8000/api/v1/services`
                const res = await axios.post(url, servicePayload);
                this.createdServiceId = res.data.data.id

                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                throw error
            }
        },
        async updateService(id: number | string, servicePayload: any) {
            try {
                const jwt = useUserStore().getJwt;
                axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
                let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/services/${id}` : `http://localhost:8000/api/v1/services/${id}`
                const res = await axios.post(url, servicePayload);
                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
                return res.data
            } catch (error) {
                console.log(error)
                throw error
            }
        },
        async deleteService(id: number) {
            try {
                const jwt = useUserStore().getJwt;
                axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
                let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/services/${id}` : `http://localhost:8000/api/v1/services/${id}`

                const res = await axios.delete(url);
                return res.data.data
            } catch (error) {
                console.log(error)
                throw error
            }
        },
        async createSubService(subServicePayload : any) {
            try {
                const jwt = useUserStore().getJwt;
                axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
                let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/subServices` : `http://localhost:8000/api/v1/subServices`
                const res = await axios.post(url, {
                    service_id : this.createdServiceId,
                    name : subServicePayload
                });
                console.log("Subservice created", res.data.data)

                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                throw error
            }
        },
    },
});