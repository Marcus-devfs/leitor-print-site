export interface UserDataObject {
    _id?: string
    name: string | null
    email: string | null
    phone: string | null
    password?: string | null
    confirmPassword?: string | null
}


export interface CustomerDataObject {
    _id?: string
    name: string | null
    email: string | null
    phone: string | null
    company: string | null
    canal: string | null
    revenue: string | null
    
}