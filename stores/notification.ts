import {defineStore} from "pinia";
import axios from "axios";
import {useUserStore} from "~/stores/users";
import { useTenantStore } from "~/stores/tenants";
import soundUrl from '~/assets/sound/notification.wav'

const play = (frequency = 300, duration = 1e3) => {
  const context = new AudioContext();
  const gainNode = context.createGain();
  const oscillator = context.createOscillator();
  oscillator.frequency.value = frequency;
  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  oscillator.start(0);
  setTimeout(() => oscillator.stop(), duration);
};

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

// const soundUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

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
        },
        getNotificationCount(state) {
            return state.notifications.length
        }
    },
    actions: {
        async fetchNotifications() {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/notifications` : `${apiUrl}/notifications`
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
            let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/notifications/${id}` : `${apiUrl}/notifications/${id}`
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
            let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/notifications` : `${apiUrl}/notifications`
            try {
                const res = await axios.post(url, notificationPayload);
                // var audio = new Audio(require('~/assets/sound/notification.wav'));
                // audio.play();
                play(800,1e3)
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
            let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/notifications/${id}` : `${apiUrl}/notifications/${id}`
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