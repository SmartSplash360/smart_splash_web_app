import {defineStore} from "pinia";
import axios from "axios";
import { useUserStore } from "~/stores/users";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
// axios.defaults.withCredentials = true;

export const useTenantStore = defineStore("tenant", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        loggedIn: false,
        currentTenant: null,
        currentTenantDomain : null,
        jwt: "",
        tenants: [],
    }),
    getters: {
        getTenants(state) {
            return state.tenants;
        },
        getCurrentTenant(state) {
            return state.currentTenant;
        },
        getCurrentTenantDomain(state) {
            return state.currentTenantDomain;
        },
        getJwt(state) {
            return state.jwt;
        },
        getLoggedIn(state) {
            return state.loggedIn;
        },
    },
    actions: {
        async register(tenantPayload: {}) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
            try {
                const res = await axios.post(`${apiUrl}/tenant`, tenantPayload);
                this.currentTenant = res.data.data;
                this.currentTenantDomain = res.data.data.domain
                // this.registerFirstUser()
                console.log(res.data)

                // if(res.data){
                //     const router = useRouter();
                //     router.push('/customers');
                // }
            } catch (error) {
                // alert(error)
                console.log(error)
            }
        },
        async registerFirstUser(){
            const { email,password,password_confirmation,name,surname } = useUserStore().getFirstUserTenant

            try {
                const user = {
                    email,
                    password,
                    password_confirmation,
                    name,
                    surname,
                    role_id : 1
                }
                const res = await axios.post(`http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/auth/register`, user);
                useUserStore().currentUser = res.data;
                
                if (res.data.success) {
                    // TODO: store in local storage
                    
                    useUserStore().currentUser = res.data.data.user;
                    useUserStore().setJwt(res.data.data.token);
                    this.loggedIn = true;

                    // set authorization header
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.token}`;
                } else {
                    throw new Error(res.data.message)
                }
            } catch (error) {
                alert(error)
                console.log(error)
            }
        },
        async updateTenant( tenantPayload: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            // Get Current Tenant Info
            let tenant = this.getCurrentTenant
            console.log("Tenant", tenant)
            console.log("Payload", tenantPayload)

            // let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/customers/${id}` : `${apiUrl}/customers/${id}`
            // try {
            //     const res = await axios.post(url, customerPayload);
            //     if (!res.data.success) {
            //         throw new Error(res.data.message);
            //     }
            // } catch (error) {
            //     console.log(error);
            //     throw error
            // }
        },
    },
});
