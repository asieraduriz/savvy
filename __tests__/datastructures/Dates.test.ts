import { Dates } from "@/datastructures";

describe("Dates.At", () => {
  // Adding a -1 as the UTCMonth returns a 0 based month
  test.each`
    target                | year    | month    | day  | hour | minute
    ${"2024-01-02"}       | ${2024} | ${1 - 1} | ${2} | ${0} | ${0}
    ${"2024-01-02:05:01"} | ${2024} | ${1 - 1} | ${2} | ${5} | ${1}
  `(`Returns $target date `, ({ target, year, month, day, hour, minute }) => {
    const date = Dates.At(target);
    const actualDate = [
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
    ];

    const expectedDate = [year, month, day, hour, minute];
    expect(actualDate).toEqual(expectedDate);
  });
});

describe("Dates.Now", () => {
  test("Returns the full date with hour and minute", () => {
    const now = Dates.Now();
    const hourMinutes = [now.getUTCHours(), now.getUTCMinutes()];

    expect(hourMinutes.every((data) => data !== 0)).toBeTruthy();
  });
});

describe("Dates.Today", () => {
  test("Returns the date for today but at 00:00:00 time", () => {
    const now = Dates.Today();
    const hourMinutes = [
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCMilliseconds(),
    ];

    expect(hourMinutes.every((data) => data === 0)).toBeTruthy();
  });
});

describe("Dates.addDays", () => {
  test("Returns the full date with hour and minute", () => {
    const now = Dates.Now();
    const hourMinutes = [now.getUTCHours(), now.getUTCMinutes()];

    expect(hourMinutes.every((data) => data !== 0)).toBeTruthy();
  });

  test("Returns the date for today but at 00:00:00 time", () => {
    const now = Dates.Today();
    const hourMinutes = [
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCMilliseconds(),
    ];

    expect(hourMinutes.every((data) => data === 0)).toBeTruthy();
  });
});

describe("Dates.daysBetween", () => {
  test("Gives proper list of days between ranges", () => {
    const now = Dates.At("2024-07-10");
    const aWeekAgo = Dates.subDays(now, 7);
    const year = 2024;
    const month = 7; // Using 7 as July, it's not zero based
    const expectedDaysBetween = [
      "2024-07-03",
      "2024-07-04",
      "2024-07-05",
      "2024-07-06",
      "2024-07-07",
      "2024-07-08",
      "2024-07-09",
      "2024-07-10",
    ];
    const dates = Dates.daysBetween({ start: aWeekAgo, end: now, year, month });

    expect(dates).toEqual(expectedDaysBetween);
  });
});

describe("Dates.isBetweenDays", () => {
  test.each`
    target                    | start                     | end                       | is
    ${new Date("2024-01-02")} | ${new Date("2024-01-01")} | ${new Date("2024-01-02")} | ${true}
    ${new Date("2024-01-02")} | ${new Date("2024-01-02")} | ${new Date("2024-01-03")} | ${true}
    ${new Date("2024-01-02")} | ${new Date("2024-01-02")} | ${new Date("2024-01-02")} | ${true}
    ${new Date("2024-01-02")} | ${new Date("2024-01-01")} | ${new Date("2024-01-03")} | ${true}
    ${new Date("2024-01-01")} | ${new Date("2024-01-02")} | ${new Date("2024-01-02")} | ${false}
    ${new Date("2024-01-03")} | ${new Date("2024-01-02")} | ${new Date("2024-01-02")} | ${false}
  `(
    `Finds $target date between $start and $end as $is`,
    ({ target, start, end, is }) => {
      expect(Dates.isBetweenDays(target, start, end)).toBe(is);
    }
  );
});
