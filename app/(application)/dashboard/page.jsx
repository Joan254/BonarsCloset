"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  Space,
  Popconfirm,
  message,
  Upload,
} from "antd";
import { PlusOutlined, UploadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [search, setSearch] = useState("");

  const [form] = Form.useForm();

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      message.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open modal for adding/editing product
  const openModal = (product = null) => {
    setModalVisible(true);
    setIsEditing(!!product);
    setCurrentProduct(product);

    if (product) {
      form.setFieldsValue({
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      });
    } else {
      form.resetFields();
    }
  };

  // Close modal
  const closeModal = () => {
    setModalVisible(false);
    setCurrentProduct(null);
    form.resetFields();
  };

  // Submit form to add/edit product
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    if (values.image.file) {
      formData.append("image", values.image.file.originFileObj);
    }

    try {
      if (isEditing && currentProduct) {
        await axios.patch(
          `http://localhost:5000/api/products/${currentProduct._id}`,
          formData
        );
        message.success("Product updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/products", formData);
        message.success("Product added successfully!");
      }
      fetchProducts();
      closeModal();
    } catch (error) {
      message.error("Operation failed. Please try again.");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      message.success("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      message.error("Failed to delete product.");
    }
  };

  // Search filter logic
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Table columns definition
  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url) => (
        <img
          src={url}
          alt="Product"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => openModal(record)}
            type="primary"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="container" style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Admin Dashboard</h1>

      {/* Search and Add Product Button */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "300px" }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal()}
        >
          Add Product
        </Button>
      </div>

      {/* Product Table */}
      <Table
        dataSource={filteredProducts}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      {/* Modal for Add/Edit Product */}
      <Modal
        title={isEditing ? "Edit Product" : "Add Product"}
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            name: "",
            price: "",
            image: null,
          }}
        >
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter product price" }]}
          >
            <Input placeholder="Enter product price" type="number" />
          </Form.Item>

          <Form.Item
            label="Product Image"
            name="image"
            valuePropName="file"
            getValueFromEvent={(e) => e.fileList?.[0]}
            rules={[{ required: true, message: "Please upload a product image" }]}
          >
            <Upload
              beforeUpload={() => false} // Prevent automatic upload
              listType="picture"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              {isEditing ? "Update Product" : "Add Product"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
