import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Text>Financial snapshot</Text>
                </View>
                <View>
                    <Text>Recent transactions</Text>
                </View>
                <View>
                    <Text>Quick actions snapshot</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
