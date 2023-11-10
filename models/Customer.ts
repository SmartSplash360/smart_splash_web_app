interface Customer {
    id: number | null | undefined
    name: String
    surname: String
    email: String
    password: String
    company: Number
    role: 'customer'
    photo: String
    phone_number: String
    created_at: String | null | undefined
    updated_at: String | null | undefined
    status: number
}