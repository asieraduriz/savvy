import { AddTransactionForm } from "@/components/AddTransactionForm"
import { withSafeArea } from "@/components/HOC"
import { View } from "@/components/Themed"

export default withSafeArea(() => {
    return (
        <View>
            <AddTransactionForm />
        </View>
    )
})