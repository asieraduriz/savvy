import { OccurrencesFilter } from "@/types";
import { createContext, useContext, PropsWithChildren, useState, FC } from "react";

const OccurrenceFilterContext = createContext<
    | {
        filter: OccurrencesFilter;
        applyFilter: (filter: Partial<OccurrencesFilter>) => void;
    }
    | undefined
>(undefined);

type Props = PropsWithChildren;

export const OccurrencesFilterProvider: FC<Props> = ({ children }) => {
    const [filter, setFilter] = useState<OccurrencesFilter>({});

    const applyFilter = (newFilter: Partial<OccurrencesFilter>) => {
        const updatedFilter = { ...filter, ...newFilter };
        setFilter(updatedFilter);
    };


    return <OccurrenceFilterContext.Provider value={{ filter, applyFilter }}>{children}</OccurrenceFilterContext.Provider>;
};

export const useFilter = () => {
    const context = useContext(OccurrenceFilterContext);
    if (context === undefined) throw new Error("useFilter must be used within OccurrencesFilterProvider");

    return context.filter;
};

export const useApplyFilter = () => {
    const context = useContext(OccurrenceFilterContext);
    if (context === undefined) throw new Error("useApplyFilter must be used within OccurrencesFilterProvider");

    return context.applyFilter;
}