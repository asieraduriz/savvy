import { View } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router"
import { Subscription } from '@/types'
import { StyleSheet } from "react-native";
import { useSubscription, useUpdateSubscription } from "@/components/contexts";
import { SubscriptionForm } from "@/components/forms";

export default () => {
    const { subscriptionId } = useLocalSearchParams<{ subscriptionId: Subscription["id"] }>();
    const subscription = useSubscription(subscriptionId);
    const updateSubscription = useUpdateSubscription();
    const submit = (updatedSubscription: Subscription) => {
        updateSubscription(updatedSubscription.id, updatedSubscription);
    }

    return (<View style={styles.container}><SubscriptionForm initial={subscription} onSubmit={submit} /></View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});