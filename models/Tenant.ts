interface Tenant {
    id: number | null | undefined
    name: String
    website: String
    email: String
    password: String
    phone_number: number | String
    address: String
    tenancy_db_name: String
    domain: Object | undefined | null
    cover : String | null | undefined
    created_at: String | null | undefined
    updated_at: String | null | undefined
}