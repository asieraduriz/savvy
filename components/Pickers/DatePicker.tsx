import { Transformers } from "@/transformers";
import { FC, useMemo } from "react";
import { CalendarList } from "react-native-calendars";

type Props = {
  when: Date;
  set: (date: Date) => void;
};

export const DatePicker: FC<Props> = ({ when, set }) => {
  const marked = useMemo(() => {
    return {
      [Transformers.toFormattedDate(when, "ymd")]: {
        selected: true,
        disableTouchEvent: true,
        selectedTextColor: "#FF0000",
      },
    };
  }, [when]);

  return (
    <CalendarList
      enableSwipeMonths
      onDayPress={({ timestamp }) => set(new Date(timestamp))}
      futureScrollRange={0}
      markedDates={marked}
    />
  );
};
