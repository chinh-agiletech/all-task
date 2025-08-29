import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';

const DashboardLayout = () => {
  const router = useRouter();
  const Logout = () => {
    router.push('/');
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <UserOutlined style={{ marginRight: 4 }} />
          <span className={styles.username}>username</span>
          <span className={styles.logout} onClick={Logout}>Logout</span>
        </div>
        <div className={styles.title}>Post</div>
        <div className={styles.list}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
