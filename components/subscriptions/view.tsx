import { Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRemoveSubscription } from '@/components/contexts';
import { Link } from 'expo-router';
import { Subscription } from '@/types';

type Props = {
    subscription: Subscription;
}

export const SubscriptionView = ({ subscription }: Props) => {
    const remove = useRemoveSubscription();

    return (
        <View key={subscription.id}>
            <Text>{subscription.name}</Text>
            <Text>{subscription.cost}</Text>
            <Text>{subscription.currency}</Text>
            <Text>{subscription.startDate.toLocaleDateString()}</Text>
            <Text>{subscription.everyWeeks}</Text>
            <Text>{subscription.notes}</Text>
            <Link href={{
                pathname: "/(tabs)/(dashboard)/[subscriptionId]",
                params: { subscriptionId: subscription.id }
            }} >
                <FontAwesome size={28} name='pencil-square-o' />
            </Link>

            <Button title='Remove' onPress={() => remove(subscription.id)} />
        </View>
    );
}
