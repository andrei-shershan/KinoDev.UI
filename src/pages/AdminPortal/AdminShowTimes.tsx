import { useEffect, useState } from "react";
import { PORTALS_TYPES } from "../../constants/portalTypes";
import MainLayout from "../../layouts/mainLayout";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import Dropdown from "../../ui/Dropdown";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useApplicationContext } from "../../state-management/providers/AdminContextProvider";
import { PageHeader } from "../../components/headers/pageHeader";
import { ShowTimesListAdmin } from "../../components/show-times/showtimesListAdmin";
import { getShowTimes } from "../../api-calls/showtimes";
import { getYearMonthDay } from "../../utils/date-time";

export const getDays = () => {
  const days = [];
  let date = new Date();

  for (let i = 0; i < 30; i++) {

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    var value = `${year}-${month}-${day}`;
    var label = `${year % 2000}-${month}-${day}`;

    days.push({
      value,
      label
    });
    date.setDate(date.getDate() + 1); // Increment the date by 1
  }

  return days;
}

const AdminShowTimes = () => {
  const { state, dispatch } = useApplicationContext();
  const [startDate, setStartDate] = useState(getYearMonthDay(new Date()));
  const [endDate, setEndDate] = useState(getYearMonthDay(new Date()));
  const navigate = useNavigate();
  const apiClient = useInternalApiClient();

  useEffect(() => {   
    getShowTimes(apiClient, dispatch, startDate, endDate);
  }, [startDate, endDate]);

  const handleStartDateDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndDate(e.target.value);
  };

  return (
    <MainLayout portalType={PORTALS_TYPES.ADMIN} >
      <PageHeader
        header="Admin ShowTimes"
        actionLabel="Add ShowTime"
        action={() => navigate(`/${ROUTES.ADMIN_PORTAL.SHOWTIMES_ADD}`)}
        type="add"
      />
      <div className="admin-showtimes">
        <div className="dropdown-container">
          <Dropdown
            id="startDateDropdown"
            options={getDays()}
            onChange={handleStartDateDropdownChange}
            selectedValue={startDate}
            labelText="Select start date:"
          />
          <Dropdown
            id="endDateDropdown"
            options={getDays()}
            onChange={handleEndDateDropdownChange}
            selectedValue={endDate}
            labelText="Select end date:"
          />
        </div>
        <ShowTimesListAdmin
          showTimes={state.showTimes || []}
        />
      </div>
    </MainLayout>
  );
}

export default AdminShowTimes;