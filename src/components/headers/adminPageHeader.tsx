import { AddAction } from "../admin-actions/addAction";

import './index.css';

export const AdminPageHeader = ({
  header,
  addAction,
  addActionLabel,
}: {
  header: string,
  addAction?: () => void,
  addActionLabel: string
}) => {

  return (
    <div className="admin-page-header-container">
      <h1>{header}</h1>
      {addAction && (
        <>
          <AddAction
            action={addAction}
            label={addActionLabel}
          />
        </>
      )}
    </div>
  );
}