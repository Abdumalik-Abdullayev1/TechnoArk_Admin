// ============= GLOBALS =============
export interface ParamsType{
    parent_category_id?: string | number,
    brand_id?: string | number,
    limit: number,
    search?: string,
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
    parent_category_id?: string | number
    brand_id?: string | number
}

export interface Category {
    get: (params: ParamsType)=> any
    create: (data:CreateData) => Promise<any>;
    update: (id: string | number, data: any) => Promise<any>;
    delete: (id: string | number) => Promise<any>;
}

// ================= Sub category ====================

interface UpdateSubCategory {
    name: string,
    parent_category_id: number,
}

export interface SubCaregory {
    get: (params: ParamsType)=> any
    create: (data: CreateData)=> Promise<any>,
    update: (id: string | number, data: UpdateSubCategory)=> Promise<any>,
    delete: (id: string | number)=> Promise<any>
}

// ================ Brand ========================

interface UpdateBrand {
    name?: any |string,
    categoryId: number | any,
    description: any | string
}

export interface Brand {
    get: (params: ParamsType)=> any
    create: (data:CreateData) => Promise<any>;
    update: (id: string | number, data: UpdateBrand) => Promise<any>;
    delete: (id: string | number) => Promise<any>;
    get_by_id: ( id:number,params: ParamsType)=>any
}

// ==================== Brand category ==================

export interface BrandCategory {
    get: (params: ParamsType)=> any
    create: (data:CreateData) => Promise<any>;
    update: (id: string | number, data: any) => Promise<any>;
    delete: (id: string | number) => Promise<any>;
    get_by_id: ( id:number,params: ParamsType)=>any
}

// ========== Products ============

interface IProductUpdate {
    name: string,
    price: number,
    category_id: number,
    brand_category_id: number,
    brand_id: number
}

export interface Products {
    get: (params: ParamsType)=> any
    create: (data:CreateData) => Promise<any>;
    update: (id: number | string, data: IProductUpdate) => Promise<any>;
    delete: (id: string | number) => Promise<any>;
    get_by_id: (id:string | number) => Promise<any>;
    get_product_by_id: ( id:number,params: ParamsType)=>any
}