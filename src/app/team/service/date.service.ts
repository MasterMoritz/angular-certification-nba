import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getDatesBetween(fromDate: Date, toDate:Date): Date[] {
    let current:Date = new Date(fromDate);
    let dates: Date[] = [];
    
    while (current <= toDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return dates;
  }

  addDays(date: Date, daysToAdd: number): Date {
    let resultDate: Date = new Date(date);
    resultDate.setDate(date.getDate() + daysToAdd);
    return resultDate;
  }
}
