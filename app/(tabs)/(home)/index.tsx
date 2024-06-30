import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useSubscriptions } from '@/components/contexts';
import { SubscriptionView } from '@/components/subscriptions';

export default () => {
    const subscriptions = useSubscriptions();
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text>Subscriptions</Text>
                {subscriptions.map((subscription) => <SubscriptionView key={subscription.id} subscription={subscription} />)}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
