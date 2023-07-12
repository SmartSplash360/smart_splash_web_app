import {useUserStore} from "~/stores/users";
import axios from "axios";

export default defineNuxtRouteMiddleware((to, _from) => {
    const store = useUserStore();
    const user = store.getCurrentUser;

    if (!user) {
        return navigateTo('/signin');
    } else {
        // set authorization header
        const jwt = store.getJwt;
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
        console.log(`Bearer ${jwt}`)
    }
});