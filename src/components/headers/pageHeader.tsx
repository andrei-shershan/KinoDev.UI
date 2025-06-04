import { AdminAction } from "../admin-actions/addAction";

import './index.css';

export const PageHeader = ({
  header,
  action: action,
  actionLabel: actionLabel,
  type,
}: {
  header: string,
  action?: () => void,
  actionLabel?: string,
  type: 'add' | 'back'
}) => {

  return (
    <div className="page-header-container">
      <h1>{header}</h1>
      {action && actionLabel && (
        <>
          <AdminAction
            action={action}
            label={actionLabel}
            type={type}
          />
        </>
      )}
    </div>
  );
}