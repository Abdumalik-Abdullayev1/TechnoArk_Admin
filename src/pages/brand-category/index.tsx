import { useLocation, useNavigate} from "react-router-dom"; // To manage query params
import { useEffect, useState } from "react";
import { BrandCategoryService } from "@service";
import { GlobalTable, Search } from "@components";
import { Button, Space, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { BrandCategoryActions } from "@modals";
import { BrandService } from "@service";
import { ConfirmDelete } from '@components'
import Notification from "../../utils/notificaion";

const Index = () => {
  const [data, setData] = useState([]);
  const [open,setOpen] = useState(false)
  const [brandCategory,setBrandCategory] = useState({})
  const [categories,setCategories] = useState([])
  const [total, setTotal] = useState(0); // To store the total number of items
  const location = useLocation()
  const navigate = useNavigate()
  const val = new URLSearchParams(location.search)
  
  const [params, setParams] = useState({
    search: val.get('search') ||'',
    page: 1,
    limit: 10,
  });

  const getData = async () => {
    try {
      const response = await BrandCategoryService.get(params);
      if (response.status === 200) {
        setData(response?.data?.data?.brandCategories);
        setTotal(response?.data?.data?.count); // Assuming the total count is provided by the API
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [params]); // Fetch data whenever params change

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
  // Handle table pagination changes
  const handleTableChange = (pagination: any) => {
    const { current = 1, pageSize = 10 } = pagination;
    // Update pagination parameters and set them in the URL query params
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
  const openModal =(item:any)=>{  
    setBrandCategory(item)
    setOpen(true)
  }
  const handleCancel =()=>{
    setBrandCategory({})
    setOpen(false)
  }

  const deleteData = async (id: number) => {
    // setLoading(true);
    try {
      const response = await BrandCategoryService.delete(id);
      getData()
      if (response?.status === 200) {
        Notification({
          type:"success",
          title: "Brand Category successfully deleted!",
        });
        // setIsModalVisible(false);
        // onSuccess();
      }
    } catch (error: any) {
      Notification({
        title: `Failed to delete brand category! ${error?.response?.data?.message} Something went wrong`,
        type:"error"
      });
    }
    // setLoading(false);
  };
  
  const getCategories = async () => {
    try {
      const response = await BrandService.get(params);
      if (response.status === 200) {
        setCategories(response?.data?.data?.brands);
        setTotal(response?.data?.data?.count); // Assuming the total count is provided by the API
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategories();
  }, [params]);

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
          <Tooltip title="Edit">
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
              title={"Delete this Brand Brand Category ?"}
            />
          </Tooltip>
        </Space>
      ),
    }
  ];

  
  
  return (
    <div className="flex flex-col gap-[20px]">
      <BrandCategoryActions open={open} handleCancel={handleCancel} brandCategory={brandCategory} categories={categories} getData={getData}/>
      <div className="flex justify-between items-center">
        <span className="w-[300px]">
            <Search params={params} setParams={setParams}/>
        </span>
        <div className="flex justify-between my-2">
        <Tooltip title="Add Brand">
            <Button type="primary" onClick={()=>setOpen(true)} style={{background: "#d55200"}}>Add Brand Category</Button>
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