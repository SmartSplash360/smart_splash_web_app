import {defineStore} from "pinia";

import axios from "axios";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

const config = useRuntimeConfig();
const requestUrl = config.public.apiUrl;

const currentUrl = window.location.href;
const hostname = new URL(currentUrl).hostname;

let apiUrl = requestUrl;

if (hostname.includes('.')) {
    apiUrl = `http://${hostname}:8000/api/v1`
}

export const useUserStore = defineStore("user", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        loggedIn: false,
        currentUser: null,
        jwt: "",
        users: [],
        userDefinedTheme: true,
    }),
    getters: {
        getUsers(state) {
            return state.users;
        },
        getCurrentUser(state) {
            return state.currentUser;
        },
        getJwt(state) {
            return state.jwt;
        },
        getLoggedIn(state) {
            return state.loggedIn;
        },
        getUserDefinedTheme(state) {
            return state.userDefinedTheme;
        }
    },
    actions: {
        async login(email: String, password: String) {
            try {

                axios.defaults.headers.post['Content-Type'] = 'application/json';
                let url = `${apiUrl}/auth/login`
                const res = await axios.post( url , {email, password});
                if (res.data.success) {
                    // TODO: store in local storage
                    this.currentUser = res.data.data.user;
                    this.jwt = res.data.data.token;
                    this.loggedIn = true;

                    // set authorization header
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.token}`;
                    return res.data.data.user;
                } else {
                    throw new Error(res.data.message)
                }


            } catch (error) {
                throw error
            }
        },
        async register(userPayload: {}) {
            try {

                axios.defaults.headers.post['Content-Type'] = 'application/json';
                const res = await axios.post(`${apiUrl}/auth/register`, userPayload);
                this.currentUser = res.data;
                
                if (res.data.success) {
                    // TODO: store in local storage
                    this.currentUser = res.data.data.user;
                    this.jwt = res.data.data.token;
                    this.loggedIn = true;

                    // set authorization header
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.token}`;
                    
                } else {
                    throw new Error(res.data.message)
                }
            } catch (error) {
                return {errorMessage : error}
            }
        },
        setJwt(newJwt : any) {
            this.jwt = newJwt;
         },
        async logout() {

            axios.defaults.headers.post['Content-Type'] = 'application/json';
            const router = useRouter();
            let url = `${apiUrl}/auth/logout`
            await axios.post(url); 
            this.currentUser = null
            this.jwt = "";
            this.loggedIn = false;
            this.userDefinedTheme = false;
            await router.push('/');
        },
        async forgotPassword() {
        },
        async fetchUsers() {
            try {
                const data = await axios.get(
                    "https://jsonplaceholder.typicode.com/users"
                );
                this.users = data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
    },
});
