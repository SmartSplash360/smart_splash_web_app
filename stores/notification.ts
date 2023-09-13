import {defineStore} from "pinia";
import axios from "axios";
import {useUserStore} from "~/stores/users";
import {useTenantStore} from "~/stores/tenants";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export const useNotificationStore = defineStore("notification", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        notifications: [],
    }),
    getters: {
        getNotifications(state) {
            return state.notifications;
        }
    },
    actions: {
        async fetchNotifications() {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/notifications` : `http://localhost:8000/api/v1/notifications`
            try {
                const res = await axios.get(url);
                this.notifications = res.data.data.data;
            } catch (error) {
                console.log(error);
                return error
            }
        },
        async fetchNotification(id: number | string) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/notifications/${id}` : `http://localhost:8000/api/v1/notifications/${id}`
            try {
                const res = await axios.get(url);
                return res.data.data;
            } catch (error) {
                console.log(error);
                return error
            }
        },
        async createNotification(notificationPayload: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/notifications` : `http://localhost:8000/api/v1/notifications`
            try {
                const res = await axios.post(url, notificationPayload);
                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                console.log(error)
                throw error
            }
        },
        async deleteNotification(id: number | string) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/notifications/${id}` : `http://localhost:8000/api/v1/notifications/${id}`
            try {
                const res = await axios.delete(url);
                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
                return res.data
            } catch (error) {
                console.log(error)
                throw error
            }
        }
    }
})