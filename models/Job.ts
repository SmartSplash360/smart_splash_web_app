interface Job {
    id: number | null | undefined
    created_at: String | null | undefined
    updated_at: String | null | undefined
    pool_id: number | null | undefined
    technician_id: number | null | undefined
    tcustomer_id: number | null | undefined
    start_time: String | null | undefined
    start_date: String | null | undefined
    end_time: String | null | undefined
    end_date: String | null | undefined
    status: String
    description: String
    technical_notes: String | null
    job_type: String
    frequence: String

    job_activities:             {
        id: number | null | undefined
        created_at: String | null | undefined
        updated_at: String | null | undefined
        job_id: number | null | undefined
        date: String | null | undefined
        description: String
        service_id: number | null | undefined
            }[] | null | undefined
    customer: object | null | undefined
    body_of_water: object | null | undefined
    services:  object[] | null | undefined
    products:  string[] | null | undefined
}