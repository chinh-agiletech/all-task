import React from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { useState } from 'react';
import styles from './index.module.css';
import { toast } from '../../../UI/Toast/toast';

interface ModalUpdateServiceProps {
  visible: boolean;
  onCancel: () => void;
  onOk?: () => void;
  initialValues?: any;
  onClose?: () => void;
}

const ModalUpdateService: React.FC<ModalUpdateServiceProps> = ({
  visible,
  onCancel,
  onOk,
  initialValues,
  onClose
}) => {
  const PRICE_TYPE = {
    VARIES: 'VARIES',
    FIXED: 'FIXED',
  };

  const [form] = Form.useForm();
  const [priceType, setPriceType] = useState(initialValues?.priceType || PRICE_TYPE.FIXED);

  React.useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue(initialValues);
      setPriceType(initialValues.priceType || PRICE_TYPE.FIXED);
    } else if (visible) {
      form.resetFields();
      setPriceType(PRICE_TYPE.FIXED);
    }
  }, [visible, initialValues, form]);

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
      toast.success('Saved successfully!');
      console.log('Form updated values:', values);
      onClose?.();
    } else {
      toast.error('Form submission failed!');
    }
    onClose?.();
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
          initialValues={initialValues ? initialValues : { priceType: PRICE_TYPE.FIXED }}
          layout='vertical'
        >
          {/* Row 1: Service Name + Duration */}
          <div className={styles.formRow}>
            <Form.Item label='Service Name' name='serviceName' className={styles.inputItem}>
              <Input placeholder='Enter service name' className={styles.inputField} />
            </Form.Item>
            <Form.Item label='Duration' name='duration' className={styles.inputItem}>
              <Input placeholder='Enter duration' className={styles.inputField} />
            </Form.Item>
          </div>

          {/* Row 2: Price Type + Price */}
          <div className={styles.formRow}>
            <Form.Item label='Price Type' name='priceType' className={styles.inputItem}>
              <Select
                onChange={handlePriceTypeChange}
                className={styles.selectField}
                value={priceType}
              >
                <Select.Option value={PRICE_TYPE.VARIES}>VARIES</Select.Option>
                <Select.Option value={PRICE_TYPE.FIXED}>FIXED</Select.Option>
              </Select>
            </Form.Item>

            <div className={styles.flex2}>
              {priceType === PRICE_TYPE.VARIES ? (
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
                <Form.Item label='Fixed Price' name='fix_price' className={styles.inputItem}>
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

export default ModalUpdateService;
