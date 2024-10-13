import { Button, Modal, Form, Input } from 'antd';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { subService } from '@service';
import Notification from '../../../utils/notificaion';
interface GlobalModal {
    open: boolean,
    handleClose: () => void,
    update: any,
    getData: () => void
}
interface ValueType {
    name: string,
    parent_category_id: number | string
}
const Index = ({ open, handleClose, update, getData }: GlobalModal) => {
    const { id } = useParams()
    const [form] = Form.useForm()

    useEffect(() => {
        if (update.id) {
            form.setFieldsValue({
                name: update.name
            })
        }
    }, [])


    const handleSubmit = async (values: ValueType) => {
        if (update.id) {
            // Update the category
            try {
                const response = await subService.update(update.id, { name: values.name, parent_category_id: Number(id) });
                getData()
                if (response.status === 200) {
                    Notification({
                        type: "success",
                        title: "Category updated successfully!",
                    });
                }
            } catch (error: any) {
                Notification({
                    title: `Failed to update category ${error?.response?.data?.message} Something went wrong`,
                    type: "error"
                });
            } finally {
            }
        } else {
            // Create a new category
            try {
                const response = await subService.create({ parent_category_id: Number(id), name: values.name });
                getData()
                if (response.status === 201) {
                    Notification({
                        title: "SubCategory added successfully!",
                        type: "success"
                    });
                    form.resetFields();
                }
            } catch (error: any) {
                Notification({
                    title: `Failed to add subcategory! ${error?.response?.data?.message} Something went wrong`,
                    type: "error",
                });
            }
        }
    }


    return (
        <>
            <Modal
                open={open}
                title={update.id ? "Edit subcategory" : "Create subcategory"}
                onCancel={handleClose}
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
                        label="Add Sub category"
                        name="name"
                        rules={[{ required: true, message: "Please input sub category name!" }]}
                    >
                        <Input size='large' />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            size="large"
                            style={{ width: "100%", background: "#d55200" }}
                            type="primary"
                            htmlType="submit"
                        >
                            {update.id ? "Update" : "Add"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Index;