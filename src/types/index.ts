// ============= GLOBALS =============
export interface ParamsType{
    id?: string,
    limit: number,
    search: string,
    pages: number
}

export interface ModalProps{
    open: boolean,
    handleClose: ()=> void,
    update: any
}

// ============= AUTH ===============
interface SignIn {
    phone_number: string,
    password: string
}
interface SignUp extends SignIn {
    first_name: string,
    last_name: string,
    email: string
}

export interface AuthRequest {
    sign_in: (data:SignIn)=>Promise<any>,
    sign_up: (data:SignUp)=>Promise<any>
}

// =============== Category ==================

interface CategoryData {
    name: string
}

export interface Category {
    create: (data: CategoryData)=> Promise<any>
    read: (params: ParamsType)=> Promise<any>,
    update: (id: string | number, data: string)=> Promise<any>
    delete: (id: string | number)=> Promise<any>
}