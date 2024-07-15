import { Defaults } from "@/constants";
import { ExpensesFilter } from "@/types";
import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  FC,
} from "react";

const ExpensesFilterContext = createContext<
  | {
      filter: ExpensesFilter;
      applyFilter: (filter: Partial<ExpensesFilter>) => void;
    }
  | undefined
>(undefined);

type Props = PropsWithChildren;

export const ExpensesFilterProvider: FC<Props> = ({ children }) => {
  const [filter, setFilter] = useState<ExpensesFilter>(Defaults.Filter);

  const applyFilter = (newFilter: Partial<ExpensesFilter>) => {
    setFilter((previous) => ({ ...previous, ...newFilter }));
  };

  return (
    <ExpensesFilterContext.Provider value={{ filter, applyFilter }}>
      {children}
    </ExpensesFilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(ExpensesFilterContext);
  if (context === undefined)
    throw new Error("useFilter must be used within EntriesFilterProvider");

  return context.filter;
};

export const useApplyFilter = () => {
  const context = useContext(ExpensesFilterContext);
  if (context === undefined)
    throw new Error("useApplyFilter must be used within EntriesFilterProvider");

  return context.applyFilter;
};
