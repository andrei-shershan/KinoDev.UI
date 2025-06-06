import { DownloadOutlined } from "@ant-design/icons";
import { OrderSummary } from "../../models/api.models";
import Button from "../../ui/Button";
import { StyleType } from "../../ui/types";
import { getDateTimeObject } from "../../utils/date-time";
import { getFileUrl } from "../../utils/files";

export const CompletedOrders = ({
  completedOrders
}: {
  completedOrders: OrderSummary[]
}) => {
  return (
    completedOrders.length > 0 ? (
      <div>
        {completedOrders
          .sort((a, b) => new Date(b.showTimeSummary.time).getTime() - new Date(a.showTimeSummary.time).getTime())
          .map((order, index) => (
            <div key={order.id || index}>
              <span>{getDateTimeObject(order.showTimeSummary.time).date} {getDateTimeObject(order.showTimeSummary.time).time}</span>
              <br />
              <span>Order ID: {order.fileUrl}</span>
              <br />
              <br />
              <span>{order.showTimeSummary.hall.name}</span>
              <br />
              {
                order.tickets.sort((a, b) => a.row - b.row).map((ticket) => (
                  <div key={ticket.ticketId}>
                    <span>row {ticket.row}, number {ticket.number}</span>
                  </div>
                ))
              }
              <div>
                <a href={getFileUrl(order.fileUrl ?? '')} target="_blank" rel="noopener noreferrer">
                  <DownloadOutlined style={{ fontSize: '20px', marginRight: '8px' }} />
                  Download Ticket
                </a>
              </div>
              <hr />
            </div>
          ))
        }
      </div >
    ) : (
      <p>No tickets found.</p>
    )
  );
}