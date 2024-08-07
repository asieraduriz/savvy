import { View } from "@/components/Themed";
import { useSubscriptions } from "@/contexts/Subscriptions/Provider";
import { FC } from "react";

export const SubscriptionsScreen: FC = () => {
    const { subscriptions } = useSubscriptions();


    return (<View>
        { }
    </View>)
}
