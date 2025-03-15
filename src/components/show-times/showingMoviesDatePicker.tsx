import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import overrideTodayDateName from "../../utils/overrideTodayDateName";

interface ShowingMoviesDatePickerProps {
  selectedDate: string;
  callBack: (pickedDate: string) => void;
}

const ShowingMoviesDatePicker: React.FC<ShowingMoviesDatePickerProps> = ({ selectedDate, callBack }) => {
  const [days, setDays] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const days = [];

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
    <div style={{ display: 'flex', gap: '16px' }}>
      {
        days.map((day, index) => (
          <button
            key={index}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => handleDateClick(day)}
          >
            {day === selectedDate ? <b>{overrideTodayDateName(day)}</b> : overrideTodayDateName(day)}
          </button>
        ))
      }
    </div>
  );
}

export default ShowingMoviesDatePicker;