import { TicketSummary } from '../models/api.models';

/**
 * Groups tickets by row and collects seat numbers for each row
 * @param tickets Array of ticket summaries
 * @returns Array of objects containing row number and array of seat numbers
 */
export const groupTicketsByRow = (tickets: TicketSummary[]) => {
  // Create a map to group tickets by row
  const rowMap: Record<number, number[]> = {};
  
  // Group tickets by row
  tickets.forEach((ticket) => {
    if (!rowMap[ticket.row]) {
      rowMap[ticket.row] = [];
    }
    
    rowMap[ticket.row].push(ticket.number);
  });
  
  // Convert the map to an array of objects with sorted seat numbers
  const result = Object.entries(rowMap).map(([row, seats]) => ({
    row: parseInt(row),
    seats: seats.sort((a, b) => a - b)
  }));
  
  // Sort by row number
  return result.sort((a, b) => a.row - b.row);
};
