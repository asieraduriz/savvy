import { Dates } from "@/datastructures";

describe("Dates.daysBetween", () => {
  it("Gives proper list of days between ranges", () => {
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
