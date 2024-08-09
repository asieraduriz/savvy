import { Screens } from "@/screens";
import { ExpensesFilterProvider } from "@/contexts";

export default () => (
    <ExpensesFilterProvider>
        <Screens.View.Expenses />
    </ExpensesFilterProvider>
);
