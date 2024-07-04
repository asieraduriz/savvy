import { ComponentType } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export function withSafeArea(WrappedComponent: ComponentType) {
    return () => {
        return <SafeAreaView>
            <WrappedComponent />;
        </SafeAreaView>
    };
}
