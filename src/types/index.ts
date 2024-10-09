// ============= GLOBALS =============
export interface ParamsType{
    id?: string,
    limit: number,
    search: string,
    page: number
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

interface CreateData {
    name: any | string
    brand_id?: any | number
}

export interface Category {
    get: (params: ParamsType)=> any
    create: (data:CreateData) => Promise<any>;
    update: (id: string | number, data: any) => Promise<any>;
    delete: (id: string | number) => Promise<any>;
}