import https from "./config";
import { Category } from "@types";

const category:Category = {
    create: data=> https.post('/category/create', data),
    read: (params)=> {
        const { search, limit, pages } = params;
        const url = `/category/search${search ? `search=${search}` : ""}`;
        return https.get(url, {params:{limit, pages}});
    },
    update: (id, data)=> https.put(`/category/updadte/${id}`, data),
    delete: (id)=> https.delete(`/category/delete/${id}`)
}

export default category