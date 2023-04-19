import { TestBed } from '@angular/core/testing';

import { DateService } from './date.service';

describe('DateService', () => {
  let service: DateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate the correct date range', () => {
    let dates: Date[] = service.getDatesBetween(new Date(2022, 10, 29), new Date(2022, 11, 2));
    expect(dates).toHaveSize(4);
    expect(dates[2]).toEqual(new Date(2022, 11, 1));
  });

  it('should add and subtract the correct amount of days', () => {
    let originalDate: Date = new Date(2022, 9, 29);
    let newDate: Date = service.addDays(originalDate, 3);
    expect(newDate).toEqual(new Date(2022, 10, 1));

    originalDate = new Date(2022, 9, 29);
    newDate = service.addDays(originalDate, -365);
    expect(newDate).toEqual(new Date(2021, 9, 29));

    originalDate = new Date(2019, 9, 29);
    newDate = service.addDays(originalDate, 365);
    expect(newDate).toEqual(new Date(2020, 9, 28));
  });
  
  it('should not mutate original date when adding days', () => {
    let originalDate: Date = new Date(2022, 10, 29);
    let newDate: Date = service.addDays(originalDate, 3);
    expect(originalDate).toEqual(new Date(2022, 10, 29));
  });
});
