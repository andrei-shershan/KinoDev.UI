import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { overrideTodayDateName } from "../../utils/date-time";

import './showingMoviesDatePicker.css';
import Button from "../../ui/Button";
import { SizeType, StyleType } from "../../ui/types";

interface ShowingMoviesDatePickerProps {
  selectedDate: string;
  callBack: (pickedDate: string) => void;
}

const ShowingMoviesDatePicker: React.FC<ShowingMoviesDatePickerProps> = ({ selectedDate, callBack }) => {
  const [days, setDays] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const days = [];

    // TODO: Place 5 into Portal Settings
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date.toISOString().split('T')[0]);
    }

    setDays(days);
  }, []);

  const handleDateClick = (day: string) => {
    callBack(day);
    navigate(`/showing/${day}`)
  }

  return (
    <div className="showing-movies-date-picker-container">
      {
        days.map((day, index) => (
          <Button
            size={SizeType.Small}
            style={day === selectedDate ? StyleType.Primary : StyleType.Free}
            key={index}
            onClick={() => handleDateClick(day)}
          >
            {overrideTodayDateName(day)}
          </Button>
        ))
      }
    </div>
  );
}

export default ShowingMoviesDatePicker;