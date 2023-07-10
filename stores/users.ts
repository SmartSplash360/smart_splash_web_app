import {defineStore} from "pinia";
import axios from "axios";
import router from "#app/plugins/router";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
// axios.defaults.withCredentials = true;

export const useUserStore = defineStore("user", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        loggedIn: false,
        currentUser: null,
        jwt: "",
        users: [],
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
        }
    },
    actions: {
        async login(email: String, password: String) {
            try {
                const res = await axios.post(
                    "http://localhost:8000/api/v1/auth/login",
                    {email, password}
                );

                console.log(res.data)

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
                throw error
            }
        },
        async register(userPayload: {}) {
            try {
                const res = await axios.post("http://localhost:8000/api/v1/auth/register", userPayload);
                this.currentUser = res.data;
            } catch (error) {
                alert(error)
                console.log(error)
            }
        },
        async logout() {
            const router = useRouter();
            const res = await axios.post("http://localhost:8000/api/v1/auth/logout");
            this.currentUser = null
            this.jwt = "";
            this.loggedIn = false;
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
