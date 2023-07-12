import { setHours, isSameHour } from 'date-fns';

export default defineNuxtRouteMiddleware((to, _from) => {
    // get time
    const currentDateTime = new Date();
    const targetDateTime = setHours(currentDateTime, 18);

    // if yes, set theme to dark
    if (isSameHour(currentDateTime, targetDateTime)) {
        console.log('The time is 6 PM.');
        useColorMode().preference = 'dark';
    } else {
        // if no, set theme to light
        console.log('The time is not 6 PM.');
        useColorMode().preference = 'light';
    }
});