import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { withSafeArea } from '@/components/HOC';

export default withSafeArea(() => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Text>Financial snapshot</Text>
                </View>
                <View>
                    <Link href='/(transactions)'>Recent transactions</Link>
                </View>
                <View>
                    <Text>Quick actions snapshot</Text>
                </View>
            </ScrollView>
        </View>
    );
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
