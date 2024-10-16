import { useLocation, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductsService } from "@service";
import { GlobalTable, Search } from "@components";
import { Button, Space, Tooltip } from "antd";
import { EyeOutlined ,EditOutlined} from "@ant-design/icons";
import { ConfirmDelete } from "@components"
import { ProductsActions } from "@modals";
import Notification from "../../utils/notificaion";

const Index = () => {
  const [data, setData] = useState([]);
  const [open,setOpen] = useState(false)
  const [total, setTotal] = useState(0);
  const location = useLocation()
  const navigate = useNavigate()
  const val = new URLSearchParams(location.search)
  const [product,setProduct] = useState({})

  const [params, setParams] = useState({
    search: val.get('search') ||'',
    page: 1,
    limit: 10,
  });
  
  const getProducts = async () => {
    try {
      const response = await ProductsService.get(params);
      if (response.status === 200) {
        setData(response?.data?.data?.products);
        setTotal(response?.data?.data?.count);
        
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    getProducts();
  }, [params]);
  
  useEffect(()=>{
    const params = new URLSearchParams(location.search)
    const page = params.get("page")
    const limit = params.get('limit')
    const input_val = params.get("search")
    const find = input_val ? input_val : ""
    const pageNumber = page ? parseInt(page) : 1
    const limitPage = limit ? parseInt(limit) : 10
    setParams(prevParams =>({
      ...prevParams,
      page: pageNumber,
      search: find,
      limit: limitPage
    }))
  },[location.search])
  const handleTableChange = (pagination: any) => {
    const { current = 1, pageSize = 10 } = pagination;
    setParams((prev) => ({
      ...prev,
      page: current,
      limit: pageSize,
    }));
    const searchParams = new URLSearchParams(location.search)
       searchParams.set("page", `${current}`)
       searchParams.set("limit", `${pageSize}`)
       navigate(`?${searchParams}`)
  };
  
  const openModal = (item:any) => {
    setProduct(item)
    setOpen(true);
  };

  const handleCancel = () => {
    setProduct({})
    setOpen(false);
  };
  const moveSingle = (id: number) => {
    navigate(`/main/products/${id}`);
  };
  const deleteData = async (id: number) => {
    try {
      const response = await ProductsService.delete(id);
      getProducts()
      if (response?.status === 200) {
        Notification({
          type:"success",
          title: "Product successfully deleted!",
        });
      }
    } catch (error: any) {
      Notification({
        type:"error",
        title: `Failed to delete Product! ${error?.response?.data?.message},Something went wrong`,
      });
    }
  };


  const columns: any = [
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
          <Tooltip title="Edit" >
             <Button
              type="default"
              icon={<EditOutlined />}
              onClick={()=>openModal(record)}
              style={{width:"45px", color:"#d55200", borderColor:"#d55200"}}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <ConfirmDelete
              id={record.id}
              onConfirm={deleteData}
              onCancel={() => console.log('Cancelled')}
              title={"Delete this Product?"}
            />
          </Tooltip >
          <Tooltip title="See more about this product">
            <Button
              className="border-[1px]"
              icon={<EyeOutlined />}
              onClick={() => moveSingle(record.id)}
              style={{width:"45px", color:"green", borderColor:"green"}}
            />
          </Tooltip>
        </Space>
      ),
    }
  ];
  return (
    <div className="flex flex-col gap-[20px]">
      <ProductsActions open={open} handleCancel={handleCancel} product={product} getProducts={getProducts}/>
      <div className="flex justify-between items-center">
        <span className="w-[300px]">
            <Search params={params} setParams={setParams}/>
        </span>
        <div className="flex justify-between my-2">
          <Tooltip title="Add Product">
              <Button type="primary" onClick={()=>setOpen(true)}>Add Product</Button>
          </Tooltip>
        </div>
        
      </div>
      <GlobalTable
        data={data}
        columns={columns}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ['2', '5', '7', '10'],
        }}
        onChange={handleTableChange}
      />
      
    </div>
  )
}

export default Index