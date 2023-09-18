import { useUserStore } from '~/stores/users';

export default defineNuxtRouteMiddleware((to, _from) => {
    const store = useUserStore();
    const user = store.getCurrentUser;
    
    if (user.role_id !== 1) {
        return navigateTo('/customers');
    } else {
        console.log("first")
    }
})