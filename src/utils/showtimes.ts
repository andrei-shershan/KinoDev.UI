import { HallTimeTable, TimeTableSlot } from "../models/admin-portal";
import { Movie, ShowTimeForDate } from "../models/api.models";

export const getTimeTable = (showTimeForDate: ShowTimeForDate, selectedMovie: Movie) => {
  if (!showTimeForDate || !showTimeForDate.hallWithMovies || showTimeForDate.hallWithMovies.length === 0) {
    return [];
  }

  const result: HallTimeTable[] = [];
  showTimeForDate.hallWithMovies.forEach(hallWithMovies => {
    // TODO: Move to PortalSettings
    let startTime = new Date(showTimeForDate.date);
    startTime.setHours(9, 0); // Assuming start time is 10:00 AM
    let endTime = new Date(showTimeForDate.date);
    endTime.setHours(22, 0); // Assuming end time is 10:00 PM

    let time = new Date(startTime);
    const timeInterval = 30; // Assuming time slots are 30 minutes apart

    const timeTableSlots: TimeTableSlot[] = [];
    while (time <= endTime) {
      timeTableSlots.push({
        time: new Date(time),
        isAvailable: !hallWithMovies.movies.some(movie => {
          const movieStartTime = new Date(movie.time);
          const movieEndTime = new Date(movieStartTime.getTime() + movie.duration * 60000);

          // Check if the current time slot overlaps with any scheduled movie
          return (time >= movieStartTime && time < movieEndTime) ||
            (new Date(time.getTime() + timeInterval * 60000) > movieStartTime && time < movieEndTime);
        }),
        isEnoughTime: true
      });

      time = new Date(time.getTime() + timeInterval * 60000); // Increment time by 30 minutes
    }

    for (let i = 0; i < timeTableSlots.length; i++) {
      let totalAvailableTimeInMin = 0;

      for (let j = i; j < timeTableSlots.length - 1; j++) {
        totalAvailableTimeInMin += timeInterval;
        if (timeTableSlots[j + 1].isAvailable) {
          continue;
        } else {
          timeTableSlots[i].isEnoughTime = totalAvailableTimeInMin >= selectedMovie.duration;

          break;
        }
      }
    }

    const hallTimeTable: HallTimeTable = {
      hall: hallWithMovies.hall,
      timeTable: timeTableSlots,
    };

    result.push(hallTimeTable);
  });

  return result;
}