import {defineStore} from "pinia";
import axios from "axios";
import {useUserStore} from "~/stores/users";
import {useTenantStore} from "~/stores/tenants";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export const useProductStore = defineStore("product", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        products: [],
    }),
    getters: {
        getProducts(state) {
            return state.products
        }
    },
    actions: {
        async fetchProducts() {
            try {
                const jwt = useUserStore().getJwt;
                axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
                const res = await axios.get(`http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/products`);
                this.products = res.data.data.data
            } catch (error) {
                console.log(error);
            }
        },
        async fetchProduct(id: number) {
            try {
                const jwt = useUserStore().getJwt;
                axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
                const res = await axios.get(`http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/products/${id}`);
                return res.data.data
            } catch (error) {
                console.log(error);
            }
        },
        async createProduct(productPayload: any) {
            try {
                const jwt = useUserStore().getJwt;
                axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
                const res = await axios.post("http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/products", productPayload);

                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                throw error
            }
        },
        async updateProduct(id: number | string, productPayload: any) {
            try {
                const jwt = useUserStore().getJwt;
                axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
                const res = await axios.post(`http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/products/${id}`, productPayload);
                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                console.log(error)
                throw error
            }
        },
        async deleteProduct(id: number) {
            try {
                const jwt = useUserStore().getJwt;
                axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
                const res = await axios.delete(`http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/products/${id}`);

                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
                return res.data
            } catch (error) {
                console.log(error)
                throw error
            }
        }
    },
});