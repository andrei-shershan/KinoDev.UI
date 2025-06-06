import { HeaderActions } from "../header-actions/headerActions";

import './index.css';

export const PageHeader = ({
  header,
  action: action,
  actionLabel: actionLabel,
  type,
}: {
  header?: string,
  action?: () => void,
  actionLabel?: string,
  type?: 'add' | 'back' | undefined
}) => {

  return (
    <div className="page-header-container">
      {header && <h1>{header}</h1>}
      {action && actionLabel && (
        <>
          <HeaderActions
            action={action}
            label={actionLabel}
            type={type}
          />
        </>
      )}
    </div>
  );
}