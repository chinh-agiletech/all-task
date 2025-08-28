import React from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { useState } from 'react';
import styles from './index.module.css';
import { toast } from 'sonner';

interface ModalCreateNewServiceProps {
  visible: boolean;
  onCancel: () => void;
  onOk?: () => void;
  onClose?: () => void;
}

const ModalCreateNewService: React.FC<ModalCreateNewServiceProps> = ({
  visible,
  onCancel,
  onOk,
  onClose,
}) => {
  const PRICE_TYPE = {
    VARIES: 'VARIES',
    FIXED: 'FIXED',
  };

  const [form] = Form.useForm();
  const [priceType, setPriceType] = useState(PRICE_TYPE.FIXED);

  const handlePriceTypeChange = (value: string) => {
    setPriceType(value);
    form.setFieldsValue({
      from_price: undefined,
      to_price: undefined,
      fix_price: undefined,
    });
  };

  const handleSubmit = (values: any) => {
    if (values) {
      toast.success('Form submitted successfully!');
      console.log('Form values:', values);
      onClose?.();
    } else {
      toast.error('Form submission failed!');
    }
  };

  return (
    <Modal
      title='Add New Service'
      open={visible}
      onCancel={onCancel}
      onOk={onOk}
      footer={null}
      destroyOnClose
      className={styles.customModal}
      style={{ maxWidth: '800px' }}
    >
      <div className={styles.formContainer}>
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{ priceType: PRICE_TYPE.FIXED }}
          layout='vertical'
        >
          {/* Row 1: Service Name + Duration */}
          <div className={styles.formRow}>
            <Form.Item
              label='Service Name'
              name='serviceName'
              className={styles.inputItem}
              rules={[{ required: true, message: 'Enter service name' }]}
            >
              <Input placeholder='' className={styles.inputField} />
            </Form.Item>
            <Form.Item
              label='Duration'
              name='duration'
              className={styles.inputItem}
              rules={[{ required: true, message: 'Enter to duration' }]}
            >
              <Input placeholder='' className={styles.inputField} />
            </Form.Item>
          </div>

          {/* Row 2: Price Type + Price */}
          <div className={styles.formRow}>
            <Form.Item
              label='Price Type'
              name='priceType'
              initialValue={PRICE_TYPE.FIXED}
              className={styles.inputItem}
            >
              <Select onChange={handlePriceTypeChange} className={styles.selectField}>
                <Select.Option value={PRICE_TYPE.VARIES}>VARIES</Select.Option>
                <Select.Option value={PRICE_TYPE.FIXED}>FIXED</Select.Option>
              </Select>
            </Form.Item>

            <div className={styles.flex2}>
              {form.getFieldValue('priceType') === PRICE_TYPE.VARIES ? (
                <div className={styles.priceGroup}>
                  <Form.Item
                    label='From Price'
                    name='from_price'
                    rules={[{ required: true, message: 'Enter from price' }]}
                    className={styles.priceItem}
                  >
                    <Input type='number' placeholder='From' min={0} className={styles.inputField} />
                  </Form.Item>
                  <Form.Item
                    label='To Price'
                    name='to_price'
                    rules={[{ required: true, message: 'Enter to price' }]}
                    className={styles.priceItem}
                  >
                    <Input type='number' placeholder='To' min={0} className={styles.inputField} />
                  </Form.Item>
                </div>
              ) : (
                <Form.Item
                  label='Fixed Price'
                  name='fix_price'
                  className={styles.inputItem}
                  rules={[{ required: true, message: 'Enter fixed price' }]}
                >
                  <Input type='number' placeholder='' min={0} className={styles.inputField} />
                </Form.Item>
              )}
            </div>
          </div>

          <div className={styles.submitBtnWrapper}>
            <Button htmlType='submit' className={styles.submitBtnCustom}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalCreateNewService;
