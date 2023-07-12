import {isSameHour, setHours} from 'date-fns';

export default defineNuxtRouteMiddleware((to, _from) => {
    // get time
    const currentDateTime = new Date();
    const targetDateTime = setHours(currentDateTime, 18);

    // get forced theme change variable
    const forcedThemeChange = useColorMode().forced

    // if yes, set theme to dark
    if (isSameHour(currentDateTime, targetDateTime) && !forcedThemeChange) {
        console.log('The time is 6 PM.');
        useColorMode().preference = 'dark';
        // useColorMode().forced = false;
    }

    // if no, set theme to light
    if (!isSameHour(currentDateTime, targetDateTime) && !forcedThemeChange) {
        console.log('The time is not 6 PM.');
        useColorMode().preference = 'light';
        // useColorMode().forced = false;
    }
});