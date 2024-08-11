import { Interval } from "@/types";

const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

/* PRECISE DATE METHODS */

export const At = (date: string) => {
    const dateAt = new Date(date);
    return dateAt;
};
export const Now = (): Date => {
    const date = new Date();
    return date;
};

export const Today = (): Date => {
    const now = Now();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export const On = (year: number, month: number, day: number = 1): Date => {
    const paddedMonth = month.toString().padStart(2, "0");
    const paddedDay = day.toString().padStart(2, "0");
    return new Date(`${year}-${paddedMonth}-${paddedDay}`);
};

export const CurrentYear = (): number => Today().getFullYear();
export const CurrentMonth = (): number => Today().getMonth() + 1;

export const Tomorrow = (): Date => {
    const now = Now();
    return addDays(now, 1);
};

/* START METHODS */
export const startOfDay = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const startOfMonth = (date: Date = new Date()): Date => new Date(date.getFullYear(), date.getMonth(), 1);

/* END METHODS */
export const endOfMonth = (date: Date): Date => new Date(date.getFullYear(), date.getMonth() + 1, 0);

/* ADD METHODS */
export const addDays = (date: Date, days: number): Date => {
    const newDate = new Date(date.getTime());
    newDate.setDate(newDate.getDate() + days);
    return newDate;
};

export const addMonths = (date: Date, months: number): Date => {
    const newDate = new Date(date.getTime());
    newDate.setMonth(date.getMonth() + months);
    return newDate;
};

/* SUBTRACT METHODS */
export const subDays = (date: Date, days: number): Date => addDays(date, -days);

export const subMonths = (date: Date, months: number): Date => addMonths(date, -months);

/* DIFF METHODS */
export const differenceInDays = (left: Date, right: Date): number => {
    const diffInTime = right.getTime() - left.getTime();
    const diffInDays = Math.round(diffInTime / MILLISECONDS_IN_A_DAY);
    return diffInDays;
};

const differenceInMonths = (left: Date, right: Date): number => {
    const startMonth = left.getFullYear() * 12 + left.getMonth();
    const endMonth = right.getFullYear() * 12 + right.getMonth();
    return endMonth - startMonth;
}

/* FORMAT METHODS */
export const toFormat = (date: Date, format: string = "yyyy-MM-dd"): string => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return format.replace("yyyy", year).replace("MM", month).replace("dd", day);
};

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const toMonth = (date: Date): string => {
    const monthIndex = date.getMonth();
    return monthNames[monthIndex];
};

export const readable = (date: Date, locale: string = "en-US"): string =>
    date.toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

/* BOOLEAN METHODS */

export const isSameDay = (left: Date, right: Date): boolean =>
    left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate();

export const isAfter = (laterDate: Date, earlierDate: Date): boolean => laterDate.getTime() > earlierDate.getTime();

export const isBefore = (earlierDate: Date, laterDate: Date): boolean => earlierDate.getTime() < laterDate.getTime();

export const isNotAfter = (earlierDate: Date, laterDate: Date): boolean => earlierDate.getTime() <= laterDate.getTime();

export const isBetweenDays = (target: Date, rangeStart: Date, rangeEnd: Date): boolean =>
    target.getTime() >= rangeStart.getTime() && target.getTime() <= rangeEnd.getTime();

/* CALCULATION METHODS */

export const daysBetween = ({ start, end, year, month }: { start: Date; end: Date; year: number; month: number }): string[] => {
    const monthStart = startOfMonth(On(year, month));
    const monthEnd = endOfMonth(On(year, month));

    const rangeStart = isAfter(start, monthStart) ? start : monthStart;
    const rangeEnd = isBefore(end, monthEnd) ? end : monthEnd;

    const days: string[] = [];
    let currentDate = new Date(rangeStart);
    while (isNotAfter(currentDate, rangeEnd)) {
        days.push(toFormat(currentDate));
        currentDate = addDays(currentDate, 1);
    }

    return days;
};

export const occurrencesInInterval = (
    start: Date,
    end: Date,
    { interval, every }: {
        interval: Interval;
        every: number;
    }
): Date[] => {
    const occurrences: Date[] = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
        occurrences.push(new Date(currentDate));

        switch (interval) {
            case Interval.days:
                currentDate.setDate(currentDate.getDate() + every);
                break;
            case Interval.weeks:
                currentDate.setDate(currentDate.getDate() + every * 7);
                break;
            case Interval.months:
                currentDate.setMonth(currentDate.getMonth() + every);
                break;
            case Interval.years:
                currentDate.setFullYear(currentDate.getFullYear() + every);
                break;
        }
    }

    return occurrences;
};

export const nextOccurrence = (start: Date, { interval, every }: {
    interval: Interval;
    every: number;
}) => {
    const now = Now();
    let nextDate = new Date(start);

    switch (interval) {
        case 'days': {
            const diffDays = differenceInDays(start, now);
            const intervalsPassed = Math.ceil(diffDays / every);
            nextDate.setDate(start.getDate() + intervalsPassed * every);
            break;
        }
        case 'weeks': {
            const diffDays = differenceInDays(start, now);
            const diffWeeks = Math.ceil(diffDays / 7);
            const intervalsPassed = Math.ceil(diffWeeks / every);
            nextDate.setDate(start.getDate() + intervalsPassed * every * 7);
            break;
        }
        case 'months': {
            const diffMonths = differenceInMonths(start, now);
            const intervalsPassed = Math.ceil(diffMonths / every);
            nextDate.setMonth(start.getMonth() + intervalsPassed * every);
            if (isBefore(nextDate, now)) {
                nextDate.setMonth(nextDate.getMonth() + every);
            }
            break;
        }
        case 'years': {
            nextDate.setFullYear(nextDate.getFullYear() + every);
            if (isBefore(nextDate, now)) {
                nextDate = nextOccurrence(nextDate, { interval, every });
            }
            break;
        }
    }

    return nextDate;
}