import {useUserStore} from "~/stores/users";

export default defineNuxtRouteMiddleware((to, _from) => {
    const store = useUserStore();
    const user = store.getCurrentUser;

    if (user && to?.name === 'signin') {
        return navigateTo('/alerts');
    } else if (user && to?.name === 'signup') {
        return navigateTo('/alerts');
    }
});