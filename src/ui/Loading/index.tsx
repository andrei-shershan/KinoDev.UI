import { Spinner } from "../Spinner";

export const Loading = ({ isLoading, children }: { isLoading?: boolean, children: React.ReactNode }) => {
  return (
    <div>
      {isLoading && <div className="spinner-overlay"><Spinner /></div>}
      {children}
    </div>
  );
}