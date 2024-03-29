import {isSameHour, setHours} from 'date-fns';
import {useUserStore} from "~/stores/users";

export default defineNuxtRouteMiddleware((to, _from) => {
    const userStore = useUserStore();

    // get time
    const currentDateTime = new Date();
    const targetDateTime = setHours(currentDateTime, 18);

    // get forced theme change variable
    const forcedThemeChange = userStore.userDefinedTheme

    // if yes, set theme to dark
    if (isSameHour(currentDateTime, targetDateTime) && !forcedThemeChange) {
        useColorMode().preference = 'dark';
        // useColorMode().forced = false;
    }

    // if no, set theme to light
    if (!isSameHour(currentDateTime, targetDateTime) && !forcedThemeChange) {
        useColorMode().preference = 'light';
        // useColorMode().forced = false;
    }
});