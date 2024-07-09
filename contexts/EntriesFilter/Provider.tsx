import { EntriesFilter } from "@/types";
import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  FC,
} from "react";

const EntriesFilterContext = createContext<
  | {
      filter: EntriesFilter;
      applyFilter: (filter: Partial<EntriesFilter>) => void;
    }
  | undefined
>(undefined);

type Props = PropsWithChildren;

export const EntriesFilterProvider: FC<Props> = ({ children }) => {
  const [filter, setFilter] = useState<EntriesFilter>({});

  const applyFilter = (newFilter: Partial<EntriesFilter>) => {
    const updatedFilter = { ...filter, ...newFilter };
    setFilter(updatedFilter);
  };

  return (
    <EntriesFilterContext.Provider value={{ filter, applyFilter }}>
      {children}
    </EntriesFilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(EntriesFilterContext);
  if (context === undefined)
    throw new Error("useFilter must be used within EntriesFilterProvider");

  return context.filter;
};

export const useApplyFilter = () => {
  const context = useContext(EntriesFilterContext);
  if (context === undefined)
    throw new Error("useApplyFilter must be used within EntriesFilterProvider");

  return context.applyFilter;
};
