// import {defineStore} from "pinia";

// type Theme = "light" | "dark";

// export const useThemeStore = defineStore("theme", {
//     persist: {
//         storage: persistedState.localStorage,
//     },
//     state: () => ({
//         theme: "",
//     }),
//     getters: {
//         getTheme(state) {
//             return state.theme
//         }
//     },
//     actions: {
//         setColorTheme(newTheme: Theme) {
//               useColorMode().preference = newTheme;
//               this.theme = newTheme
//             }
//         }
// });