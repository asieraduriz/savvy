import { Card } from "@/components/Card";
import { Text, View } from "@/components/Themed";
import { useSubscriptions } from "@/contexts/Subscriptions/Provider";
import { useRouter } from "expo-router";
import { FC } from "react";

export const SubscriptionsScreen: FC = () => {
    const { subscriptions } = useSubscriptions();

    const { navigate } = useRouter()
    return (<View>
        {
            subscriptions.map((subscription) =>
                <Card key={subscription.id} onEditPress={() => navigate(`/edit/subscription/${subscription.id}`)}>
                    <Text>{subscription.title}</Text>
                    <Text>{subscription.amount}</Text>
                </Card>
            )
        }
    </View>)
}
