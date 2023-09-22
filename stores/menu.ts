import {defineStore} from "pinia";
import axios from "axios";
import {useUserStore} from "~/stores/users";
import {useTenantStore} from "~/stores/tenants";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export const useMenuStore = defineStore("menu", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        menu: [],
        searchQuery : '',
    }),
    getters: {
        getMenu(state) {
            return state.menu;
        },

    },
    actions: {
        async fetchMenuByRole(id : number | string) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/roleMenus/getMenuByRole/${id}` : `http://localhost:8000/api/v1/roleMenus/getMenuByRole/${id}`
            try {
                const res = await axios.get(url);
                this.menu = res.data.data;
            } catch (error) {
                console.log(error);
                return error
            }
        }
    }
})