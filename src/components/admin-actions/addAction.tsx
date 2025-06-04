import { PlusCircleOutlined } from '@ant-design/icons';
import './index.css';

export const AddAction = ({
  action,
  label
}: {
  action: () => void,
  label: string
}) => {
  return (
    <div className="add-action-component" onClick={action}>
      <PlusCircleOutlined style={{ fontSize: '20px' }} /><div className='add-action-component-label'>{label}</div>
    </div>
  );
}