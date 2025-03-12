import { DATE_TIMES } from "../constants/dateTimes";

const overrideTodayDateName = (date: string) => {
  const today = new Date().toISOString().split('T')[0];

  if (date === today) {
    return DATE_TIMES.TODAY;
  }

  return date;
}

export default overrideTodayDateName;