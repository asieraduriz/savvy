import { Dates } from "@/datastructures";
import { FC, useMemo } from "react";
import { CalendarList, CalendarListProps } from "react-native-calendars";

type Props = {
  when: Date;
  set: (date: Date) => void;
  calendarWidth?: CalendarListProps["calendarWidth"];
};

export const DatePicker: FC<Props> = ({ when, set, calendarWidth }) => {
  const marked = useMemo(() => {
    return {
      [Dates.toFormat(when)]: {
        selected: true,
        disableTouchEvent: true,
        selectedTextColor: "#FF0000",
      },
    };
  }, [when]);

  return (
    <CalendarList
      onDayPress={({ year, month, day, timestamp }) => set(new Date(timestamp))}
      futureScrollRange={0}
      markedDates={marked}
      calendarWidth={calendarWidth}
    />
  );
};
