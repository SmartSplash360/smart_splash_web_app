interface Quote {
    job_start_time: String | null | undefined
    job_end_time: String | null | undefined
    id: number | null | undefined
    reference: String
    status: String
    job_id: number | null | undefined
    comment: String | null
    created_at: String | null | undefined
    updated_at: String | null | undefined
    total_amount: number
    pool_name: String
    pool_address: String
    pool_type: String
    technician_name: String
    customer_name: String
    customer_address: String | null
}