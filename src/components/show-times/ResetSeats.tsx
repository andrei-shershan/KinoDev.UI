import { CloseCircleOutlined } from "@ant-design/icons";
import Button from "../../ui/Button";
import { StyleType } from "../../ui/types";

export const ResetSeats = (
  { resetSelectedSeats }: { resetSelectedSeats: () => void }
) => {
  return (
    <>
      <Button style={StyleType.Icon} onClick={() => resetSelectedSeats()}>
        <CloseCircleOutlined style={{ fontSize: '20px' }} />
        Reset
      </Button>
    </>
  );
}
