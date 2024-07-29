import { Dates } from "@/datastructures";
import { Interval } from "@/types";

describe("Dates", () => {
  test("Dates.On", () => {
    const date = new Date("2024-07-01");

    const actualDate = Dates.On(2024, 7);

    expect(date.getTime()).toEqual(actualDate.getTime());
  });

  test("Dates.daysBetween", () => {
    const actualDates = Dates.daysBetween({
      start: new Date("2024-07-01"),
      end: new Date("2024-07-03"),
      year: 2024,
      month: 7,
    });

    expect(["2024-07-01", "2024-07-02", "2024-07-03"]).toEqual(actualDates);
  });

  const today = new Date("2024-07-05");
  test.each`
    start                     | every | interval           | expectedNextOccurrence
    ${new Date("2024-07-02")} | ${1}  | ${Interval.days}   | ${new Date("2024-07-05")}
    ${new Date("2024-07-02")} | ${2}  | ${Interval.days}   | ${new Date("2024-07-06")}
    ${new Date("2024-06-27")} | ${1}  | ${Interval.weeks}  | ${new Date("2024-07-11")}
    ${new Date("2024-07-02")} | ${1}  | ${Interval.weeks}  | ${new Date("2024-07-09")}
    ${new Date("2024-07-02")} | ${2}  | ${Interval.weeks}  | ${new Date("2024-07-16")}
    ${new Date("2024-05-12")} | ${2}  | ${Interval.weeks}  | ${new Date("2024-07-07")}
    ${new Date("2024-05-04")} | ${1}  | ${Interval.months} | ${new Date("2024-08-04")}
    ${new Date("2024-06-12")} | ${2}  | ${Interval.months} | ${new Date("2024-08-12")}
    ${new Date("2023-06-12")} | ${1}  | ${Interval.years}  | ${new Date("2025-06-12")}
    ${new Date("2024-06-12")} | ${2}  | ${Interval.years}  | ${new Date("2026-06-12")}
    ${new Date("2022-06-12")} | ${5}  | ${Interval.years}  | ${new Date("2027-06-12")}
    ${new Date("2023-08-12")} | ${1}  | ${Interval.years}  | ${new Date("2024-08-12")}
  `("Dates.nextOccurrence $start $every $interval is $expectedNextOccurrence", ({ start, every, interval, expectedNextOccurrence }) => {
    jest.useFakeTimers();
    jest.setSystemTime(today);
    const actualNextOccurrence = Dates.nextOccurrence(start, { interval, every });

    expect(actualNextOccurrence).toEqual(expectedNextOccurrence);

    jest.useRealTimers();
  });
});
