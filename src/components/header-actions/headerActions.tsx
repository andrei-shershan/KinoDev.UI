import { ArrowLeftOutlined, PlusCircleOutlined } from '@ant-design/icons';
import './index.css';

export const HeaderActions = ({
  action,
  label,
  type
}: {
  action: () => void,
  label: string,
  type?: 'add' | 'back' | undefined
}) => {
  return (
    <div className="action-component" onClick={action}>
      {
        type === 'add' ?
          <PlusCircleOutlined style={{ fontSize: '20px' }} /> :
          <ArrowLeftOutlined style={{ fontSize: '20px' }} />
      }
      <div className='action-component-label'>{label}</div>
    </div>
  );
}