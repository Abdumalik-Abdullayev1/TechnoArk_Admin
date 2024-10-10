import https from "./config";
import { SubCaregory } from "@types";
const sub: SubCaregory = {
    get: (params)=> {
        const {search, limit, page} = params;
        const url = `/sub-category/search${search ? `?search=${search}` : ''}`;
        return https.get(url, {params: {page, limit}})
    },
    create: (data)=> https.post('/sub-category/create', data),
    update: (id, data)=> https.patch(`/sub-category/update/${id}`, data),
    delete: (id)=> https.delete(`sub-category/delte/${id}`)
}

export default sub