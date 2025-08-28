import React, { useState } from 'react';
import { Form, Input, Button, Select, Space } from 'antd';
import styles from './index.module.css';

const PRICE_TYPE = {
  VARIES: 'VARIES',
  FIXED: 'FIXED',
};

const CustomForm = () => {
  const [form] = Form.useForm();
  const [priceType, setPriceType] = useState(PRICE_TYPE.FIXED);
  const [services, setServices] = useState([{ key: Date.now() }]);

  const handlePriceTypeChange = (value: string) => {
    setPriceType(value);
    if (value === PRICE_TYPE.FIXED) {
      form.setFieldsValue({ from_price: undefined, to_price: undefined, fix_price: undefined });
    } else {
      form.setFieldsValue({ from_price: undefined, to_price: undefined, fix_price: undefined });
    }
  };

  const handleAddService = () => {
    setServices([...services, { key: Date.now() }]);
  };

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
  };

  return (
    <div className={styles.formContainer}>
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{ priceType: PRICE_TYPE.FIXED }}
        layout='vertical'
      >
        <div className={styles.submitBtnWrapper}>
          <Button htmlType='submit' className={styles.submitBtnCustom}>
            Submit
          </Button>
        </div>
        {services.map((service, idx) => (
          <div className={styles.formFirst} key={service.key}>
            <Space direction='vertical' className={styles.fullWidth}>
              <Space className={styles.flexRow} align='start'>
                <Form.Item
                  label='Service Name'
                  name={[`services`, idx, 'serviceName']}
                  // rules={[{ required: true, message: 'Please input service name' }]}
                  className={styles.inputItem}
                >
                  <Input placeholder='' className={styles.inputField} />
                </Form.Item>
                <Form.Item
                  label='Duration'
                  name={[`services`, idx, 'duration']}
                  // rules={[{ required: true, message: 'Please input duration' }]}
                  className={styles.inputItem}
                >
                  <Input placeholder='' className={styles.inputField} />
                </Form.Item>
              </Space>
              <Space className={styles.flexRow} align='start'>
                <Form.Item
                  label='Price Type'
                  name={[`services`, idx, 'priceType']}
                  initialValue={PRICE_TYPE.FIXED}
                  className={styles.inputItem}
                >
                  <Select onChange={handlePriceTypeChange} className={styles.selectField}>
                    <Select.Option value={PRICE_TYPE.VARIES}>VARIES</Select.Option>
                    <Select.Option value={PRICE_TYPE.FIXED}>FIXED</Select.Option>
                  </Select>
                </Form.Item>
                <div className={styles.flex2}>
                  {form.getFieldValue([`services`, idx, 'priceType']) === PRICE_TYPE.VARIES ||
                  (form.getFieldValue([`services`, idx, 'priceType']) === undefined &&
                    priceType === PRICE_TYPE.VARIES) ? (
                    <Space>
                      <Form.Item
                        label='From Price'
                        name={[`services`, idx, 'from_price']}
                        rules={[{ required: true, message: 'Enter from price' }]}
                        className={styles.priceItem}
                      >
                        <Input
                          type='number'
                          placeholder='From'
                          min={0}
                          className={styles.inputField}
                        />
                      </Form.Item>
                      <Form.Item
                        label='To Price'
                        name={[`services`, idx, 'to_price']}
                        rules={[{ required: true, message: 'Enter to price' }]}
                        className={styles.priceItem}
                      >
                        <Input
                          type='number'
                          placeholder='To'
                          min={0}
                          className={styles.inputField}
                        />
                      </Form.Item>
                    </Space>
                  ) : (
                    <Form.Item
                      label='Fixed Price'
                      name={[`services`, idx, 'fix_price']}
                      // rules={[{ required: true, message: 'Enter fixed price' }]}
                      className={styles.inputItem}
                    >
                      <Input type='number' placeholder='' min={0} className={styles.inputField} />
                    </Form.Item>
                  )}
                </div>
              </Space>
            </Space>
          </div>
        ))}
        <div className={styles.addBtnWrapper}>
          <Button onClick={handleAddService} className={styles.addBtn}>
            Add Service
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CustomForm;
