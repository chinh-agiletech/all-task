import classNames from 'classnames';
import { toast as t } from 'sonner';

import Text from '../Text';
import styles from './index.module.scss';

// Import icon từ antd
import {
  CheckCircleFilled,
  CloseCircleFilled,
  CloseOutlined,
} from '@ant-design/icons';

export const toast = {
  success: (message: string) => {
    t.custom((id) => (
      <div className={classNames(styles.msg, styles.msgSuccess)}>
        <div>
          <CheckCircleFilled
            style={{ color: '#52c41a', fontSize: 20, cursor: 'pointer' }}
            onClick={() => t.dismiss(id)}
          />
          <Text color='primary-1'>
            {message}
          </Text>
        </div>
        <CloseOutlined
          style={{ fontSize: 18, cursor: 'pointer' }}
          onClick={() => t.dismiss(id)}
        />
      </div>
    ));
  },

  error: (message: string) => {
    t.custom((id) => (
      <div className={classNames(styles.msg, styles.msgError)}>
        <div>
          <CloseCircleFilled
            style={{ color: '#ff4d4f', fontSize: 20, cursor: 'pointer' }}
            onClick={() => t.dismiss(id)}
          />
          <Text color='primary-1'>
            {message}
          </Text>
        </div>
        <CloseOutlined
          style={{ fontSize: 18, cursor: 'pointer' }}
          onClick={() => t.dismiss(id)}
        />
      </div>
    ));
  },
};