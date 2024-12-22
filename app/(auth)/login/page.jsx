"use client";
import React from 'react';
import { Input, Form, Card, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Image from 'next/image';
// import Logo from '/public/icons/logo-black-transparent.png';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import axios from 'axios';

export default function LoginPage() {
  const [form] = Form.useForm();
  const router = useRouter();

  const login = async (values) => {
    try {
      const response = await axios.post('/login', values);
      
      if (response.status === 200 && response.data.success) {
        setCookie('token', response.data.access_token);
        setCookie('refresh_token', response.data.refresh_token);
        router.push('/dashboard');
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error('Login failed: ' + error);
    }
  };

  const onFinish = async (values) => {
    try {
      await login(values);
    } catch (error) {
      message.error('Login failed: ' + error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Login failed: ' + errorInfo);
  };
  

  return (
    <div className="flex flex-col lg:flex-row min-h-screen max-h-screen">
      <div className="flex flex-col justify-center items-center w-full p-4">
        <div className="flex flex-col items-center mb-8">
          {/* <Image
            src={Logo}
            alt="Logo"
            width={150}
            height={150}
            style={{ width: 'auto', height: 'auto' }}
            priority
          /> */}
          <h1 className="text-2xl font-bold mt-8 text-center">Admin Login</h1>
        </div>

        <Card className="w-full max-w-xl mt-0 p-4 shadow-lg rounded-3xl flex-shrink-0">
          <h2 className="text-xl font-bold text-center mb-4">Sign In</h2>
          <Form
            form={form}
            name="login"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Enter Admin Username"
              name="name"
              rules={[
                { required: true, message: 'Please input your Admin username!' }
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Admin Username"
                size="large"
                className="bg-gray-200"
                autoComplete="name"
                aria-label="Name"
              />
            </Form.Item>
            <Form.Item
              label="Enter Admin Password"
              name="password"
              rules={[
                { required: true, message: 'Please input Admin password!' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Admin Password"
                size="large"
                className="bg-gray-200"
                autoComplete="current-password"
                aria-label="Password"
              />
            </Form.Item>
            <div className="mb-2 flex justify-end">
              <Button type="primary" htmlType="submit" size="large" className="border-none">
                LOGIN
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}
