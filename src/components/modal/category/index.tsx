import { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import Notification from "../../../utils/notificaion";
import { CategoryService } from "@service";

interface PropType {
  open: boolean,
  handleCancel:()=> void,
  category: any,
  getData: any,
}
const UpdateCreateCategoryModal = ({ open, handleCancel, category,getData }:PropType) => {

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    if (category.name) {
      form.setFieldsValue({
        name: category.name,
      });
    } else {
      form.resetFields();
    }
  }, [category, form]);

  const handleSubmit = async(values: any) => {
    setLoading(true);
    
    if (category.id) {
      try {
        const response = await CategoryService.update(category.id, { name: values.name });
        getData()
        if (response.status === 200) {
          Notification({
            type: "success",
            title: "Category updated successfully!",
          });
        }
      } catch (error: any) {
        Notification({
          type:"error",
          title: `Failed to update category,  ${error?.response?.data?.message} || "Something went wrong" `,
        });
      } finally {
        setLoading(false);
      }
    } else {
      // Create a new category
      try {
        const response = await CategoryService.create({ name: values.name });
        getData()
        if (response.status === 201) {
          Notification({
            type:"success",
            title: "Category added successfully!",
          });
          form.resetFields();
        }
      } catch (error: any) {
        Notification({
          title: `Failed to add category ,  ${error?.response?.data?.message}  Something went wrong`,
          type:"error"
        });
      }
      console.log("Creating category:", values);
    }
    setLoading(false);
    handleCancel();
  };
  return (
    <>
      <Modal
        open={open}
        title={category.id ? "Edit category" : "Create category"}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          form={form}
          name="categoryForm"
          style={{ width: "100%", marginTop: "20px" }}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Category name"
            name="name"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {category.id ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UpdateCreateCategoryModal;