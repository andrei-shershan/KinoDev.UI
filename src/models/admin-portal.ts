import { Hall } from "./api.models";

export interface HallTimeTable {
  hall: Hall,
  timeTable: TimeTableSlot[],
}

export interface TimeTableSlot {
  time: Date,
  isAvailable: boolean,
  isEnoughTime: boolean,
}
