import React from 'react';
import { Form, Input, Button } from 'antd';
import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';
import Text from '@components/UI/Text';
import styles from './index.module.css';
import { toast } from '@components/UI/Toast/toast';

const Login = () => {
  const router = useRouter();
  // Dummy login API
  const loginApi = async (values: { username: string }) => {
    return new Promise((resolve) => setTimeout(() => resolve(values), 1000));
  };

  const { run, loading } = useRequest(
    async (values: { username: string }) => {
      return await loginApi(values);
    },
    {
      manual: true,
      onSuccess: () => {
        router.push('/dashboard');
        toast.success('Login successful');
      },
    },
  );

  const handleSubmit = (values: { username: string }) => {
    run(values);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formLogin}>
        <Text type='h1-bold' className='flex justify-center mb-4'>
          LOGIN
        </Text>
        <Form layout='vertical' onFinish={handleSubmit}>
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder='' className={styles.formItemInput} />
          </Form.Item>
          <Form.Item>
            <div className={styles.submitButton}>
              <Button
                type='primary'
                htmlType='submit'
                loading={loading}
                className='w-[82px] bg-[#BCBCBC] border-none'
              >
                Login
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
