import { Dates } from "@/datastructures";

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
});
