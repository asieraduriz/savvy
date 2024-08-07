import { Card } from "@/components/Card";
import { Text, View } from "@/components/Themed";
import { useSubscriptions } from "@/contexts/Subscriptions/Provider";
import { FC } from "react";

export const SubscriptionsScreen: FC = () => {
    const { subscriptions } = useSubscriptions();


    return (<View>
        {
            subscriptions.map((subscription) =>
                <Card key={subscription.id}>
                    <Text>{subscription.title}</Text>
                    <Text>{subscription.amount}</Text>
                </Card>
            )
        }
    </View>)
}
