import { Text, View } from "@/components/Themed";
import { Subscription } from "@/types";
import { ScrollView } from "react-native";

type Props = {
    subscription: Subscription
};

export const EditSubscriptionForm = ({ subscription }: Props) => {
    return (
        <View>
            <ScrollView>
                <Text>{JSON.stringify(subscription, null, 4)}</Text>
            </ScrollView>
        </View>
    );
};
