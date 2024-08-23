import { ExpensesFilterProvider } from '@/contexts';
import { Screens } from '@/screens';

export default () => <ExpensesFilterProvider>
    <Screens.View.Home />
</ExpensesFilterProvider>