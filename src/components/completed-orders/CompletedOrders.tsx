import { AppstoreOutlined, BorderBottomOutlined, DownloadOutlined, ReloadOutlined } from "@ant-design/icons";
import { OrderSummary } from "../../models/api.models";
import { getDateTimeObject } from "../../utils/date-time";
import { getFileUrl } from "../../utils/files";
import { groupTicketsByRow } from "../../utils/tickets";
import Button from "../../ui/Button";
import { StyleType } from "../../ui/types";
import { BasicDetails } from "../labels/BasicDetails";

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
              <h3>{order.showTimeSummary.movie.name}</h3>
              <h4>{getDateTimeObject(order.showTimeSummary.time).date} {getDateTimeObject(order.showTimeSummary.time).time}</h4>
              <br />
              <BasicDetails
                label="Hall"
                details={order.showTimeSummary.hall.name}
                multiline
              />
              <BasicDetails
                details={'Tickets:'}
                multiline
              >
                <AppstoreOutlined />
              </BasicDetails>
              {
                groupTicketsByRow(order.tickets).map((rowGroup) => (
                  <div>
                    <span className="gray-label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row <strong> {`${rowGroup.row}`}</strong>, seats: <strong>{`${rowGroup.seats.join(', ')}`}</strong></span>
                  </div>
                ))
              }
              <div>
                {
                  order.fileUrl &&
                  <a href={getFileUrl(order.fileUrl)} target="_blank" rel="noopener noreferrer">
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', marginTop: '10px', marginBottom: '10px' }}>
                      <div>
                        <DownloadOutlined style={{ fontSize: '20px', marginRight: '8px' }} />
                      </div>
                      <div style={{ display: 'flex', textAlign: 'left' }}>
                        Download Ticket
                      </div>
                    </div>
                  </a>
                }

                {
                  !order.fileUrl && <Button
                    style={StyleType.Icon}
                    onClick={() => window.location.reload()}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', marginLeft: '-20px', marginTop: '10px' }}>
                      <div>
                        <ReloadOutlined style={{ fontSize: '14px', marginRight: '8px' }} />
                      </div>
                      <div style={{ display: 'flex', textAlign: 'left' }}>
                        We're preparing your ticket for download. Please check back later.
                      </div>
                    </div>
                  </Button>
                }
              </div>
              <hr style={{ border: '1px solid #eee', marginBottom: '20px' }} />
            </div>
          ))
        }
      </div >
    ) : (
      <>
        <p>No tickets found.</p>
        <br />
        <br />
        <hr style={{ border: '1px solid #eee', marginBottom: '20px' }} />
      </>
    )
  );
}