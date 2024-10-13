import { useEffect, useState } from "react"
import { useNavigate, useLocation, useParams } from "react-router-dom"
import { EditOutlined } from '@ant-design/icons'
import { Space, Button, Tooltip } from "antd"
import Notification from "../../utils/notificaion"
import { GlobalTable } from "@components"
import { ConfirmDelete } from "@components"
import { SubCategory } from "@modals"
import { subService } from "@service"

const Index = () => {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [update, setUpdate] = useState({})
    const [total, setTotal] = useState()
    const navigate = useNavigate()
    const location = useLocation()
    const search_value = new URLSearchParams(location.search)
    const { id } = useParams()
    const [params, setParams] = useState({
        parent_category_id: id,
        search: search_value.get('search') || '',
        page: 1,
        limit: 5,
    })

    const getData = async () => {
        try{
            const res = await subService.get(params)
            setData(res?.data?.data?.subcategories)
            setTotal(res?.data?.data?.count)
        }catch(error){
            console.error("error");
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const deleteData = async (id: number) => {
        try {
            const res = await subService.delete(id)
            getData()
            if(res.status === 200){
                Notification({title: "Sub category created successfully!", type: "success"})
            }
        } catch {
            console.error("error")
        }
    }
    const editItem = (item: any) => {
        setUpdate(item)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        setUpdate({})
    }
    const handleTableChange = (pagination: number | any) => {
        const { current = 1, pageSize = 5 } = pagination
        setParams((prev) => ({ ...prev, limit: pageSize, page: current }));
        const current_params = new URLSearchParams(location.search)
        current_params.set('page', `${current}`)
        current_params.set('limit', `${pageSize}`)
        navigate(`?${current_params}`)
    }
    const columns = [
        {
            title: "№",
            dataIndex: "index",
            key: "index",
            align: "center",
            render: (_text: string, _record: any, index: number) =>
                `${(params.page - 1) * params.limit + index + 1}`,
        },
        { title: 'Name', dataIndex: 'name', key: 'name', align: "center" },
        {
            title: "Actions",
            key: "actions",
            align: "center",
            render: (_text: string, record: any) => (
                <Space size={"middle"}>
                    <Tooltip title="Edit">
                        <Button type="default" onClick={() => editItem(record)} icon={<EditOutlined />} />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <ConfirmDelete
                            id={record.id}
                            onConfirm={deleteData}
                            onCancel={() => console.log('Cancelled')}
                            title={"Delete this Category ?"}
                        />
                    </Tooltip>
                </Space>
            ),
        }
    ];

    return (
        <>
            <SubCategory open={open} handleClose={handleClose} update={update} getData={getData} />
            <Button onClick={()=>setOpen(true)}>Open Modal</Button>
            <GlobalTable
                columns={columns}
                data={data}
                pagination={{
                    current: params.page,
                    pageSize: params.limit,
                    total: total,
                    showSizeChanger: true,
                    pageSizeOptions: ['2', '5', '7', '10', '12']
                }}
                onChange={handleTableChange}
            />
        </>
    )
}

export default Index
