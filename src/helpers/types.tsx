export interface UserDataObject {
    _id?: string
    name: string | null
    email: string | null
    phone: string | null
    password?: string | null
    confirmPassword?: string | null
    permissions: string[]
}


export interface CustomerDataObject {
    _id?: string | null
    name: string | null
    email: string | null
    phone: string | null
    company: string | null
    canal?: string | null
    revenue?: string | null
}


export interface AnalyticsObjectData {
    _id?: string | null
    name: string | null
    customerId?: string | null
    userId: string | null
    startDate: string | null
    endDate: string | null
    description: string | null
    files: string[]
}