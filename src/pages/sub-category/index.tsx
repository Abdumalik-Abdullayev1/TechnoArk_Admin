import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { GlobalTable } from "@components"
import { subService } from "@service"

const Index = () => {
    const [data, setData] = useState([])
    const search_value = new URLSearchParams(location.search)
    const [params, setParams] = useState({
        search: search_value.get('search') || '',
        page: 1,
        limit: 5,
    })

    const getData = async () => {
        const res = await subService.get(params)
        setData(res?.data?.data?.subcategories)
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <>
        
        </>
    )
}

export default Index
