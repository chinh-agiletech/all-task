import React from 'react';
import { Table, Button } from 'antd';
import ModalCreateNewService from './components/modalCreateNewService';
import ModalUpdateService from './components/modalUpdateServie';
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const data: any[] = [
  {
    key: '1',
    serviceName: 'Haircut',
    duration: '30',
    priceType: 'FIXED',
    from_price: null,
    to_price: null,
    fix_price: 400000,
  },
  {
    key: '2',
    serviceName: 'Haircut 2',
    duration: '20',
    priceType: 'VARIES',
    from_price: 300000,
    to_price: 500000,
    fix_price: null,
  },
];

const NewServiceTable: React.FC = () => {
  const [isModalCreate, setIsModalCreate] = React.useState(false);
  const [isModalUpdate, setIsModalUpdate] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState<any>(null);
  const columns = [
    {
      title: 'Service Name',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Price Type',
      dataIndex: 'priceType',
      key: 'priceType',
    },
    {
      title: 'From Price',
      dataIndex: 'from_price',
      key: 'from_price',
      render: (value: number) => (value ? value : '-'),
    },
    {
      title: 'To Price',
      dataIndex: 'to_price',
      key: 'to_price',
      render: (value: number) => (value ? value : '-'),
    },
    {
      title: 'Fixed Price',
      dataIndex: 'fix_price',
      key: 'fix_price',
      render: (value: number) => (value ? value : '-'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Button
          onClick={() => {
            setSelectedService(record);
            setIsModalUpdate(true);
          }}
          type='link'
        >
          <EditOutlined style={{ fontSize: '16px', color: 'black', textDecoration: "none" }} />
        </Button>
      ),
    },
  ];
  return (
    <>
      <div className='flex justify-end mt-[16px] mb-[16px] mr-[16px]'>
        <Button onClick={() => setIsModalCreate(true)} icon={<PlusOutlined />}>
          Add Service
        </Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey='serviceName' pagination={false} />
      <ModalCreateNewService visible={isModalCreate} onCancel={() => setIsModalCreate(false)} onClose={() => setIsModalCreate(false)} />
      <ModalUpdateService
        visible={isModalUpdate}
        onCancel={() => setIsModalUpdate(false)}
        initialValues={selectedService}
        onClose={() => setIsModalUpdate(false)}
      />
    </>
  );
};

export default NewServiceTable;
