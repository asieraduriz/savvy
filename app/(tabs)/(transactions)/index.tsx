import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { useState } from "react";
import { Subscription } from "@/types";
import { uuid } from "@/helpers";
import { useAddSubscription } from "@/components/contexts";
import { SubscriptionForm } from "@/components/forms";

export default () => {
    const [id] = useState(uuid());
    const add = useAddSubscription()
    const subscription: Subscription = {
        id,
        name: '',
        cost: '',
        currency: '€',
        startDate: new Date(),
        everyWeeks: '4',
        notes: ''
    };


    const submit = (newSubscription: Subscription) => {
        add(newSubscription);
    }

    return (<View style={styles.container}><SubscriptionForm initial={subscription} onSubmit={submit} /></View>)
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
