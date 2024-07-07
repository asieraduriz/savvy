import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, PanResponder, PanResponderGestureState, LayoutChangeEvent } from 'react-native';

interface DualSliderProps {
    min: number;
    max: number;
    step: number;
    onValuesChange: (values: [number, number]) => void;
}

export const DualSlider: React.FC<DualSliderProps> = ({ min, max, step, onValuesChange }) => {
    const [value1, setValue1] = useState(min);
    const [value2, setValue2] = useState(max);
    const sliderWidth = useRef(0);
    const [sliderMeasured, setSliderMeasured] = useState(false);

    const updateValue = useCallback((gestureState: PanResponderGestureState, isFirstKnob: boolean) => {
        const newValue = valueFromPosition(gestureState.moveX);
        if (isFirstKnob) {
            const updatedValue = Math.min(Math.max(newValue, min), value2 - step);
            setValue1(updatedValue);
            onValuesChange([updatedValue, value2]);
        } else {
            const updatedValue = Math.max(Math.min(newValue, max), value1 + step);
            setValue2(updatedValue);
            onValuesChange([value1, updatedValue]);
        }
    }, [value1, value2, min, max, step, onValuesChange]);

    const panResponder1 = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => updateValue(gestureState, true),
        })
    ).current;

    const panResponder2 = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => updateValue(gestureState, false),
        })
    ).current;

    const valueFromPosition = (position: number) => {
        const ratio = (position - 10) / (sliderWidth.current - 20);
        const value = min + ratio * (max - min);
        return Math.round(value / step) * step;
    };

    const positionFromValue = (value: number) => {
        const ratio = (value - min) / (max - min);
        return 10 + ratio * (sliderWidth.current - 20);
    };

    const onLayout = (event: LayoutChangeEvent) => {
        sliderWidth.current = event.nativeEvent.layout.width;
        setSliderMeasured(true);
    };

    if (!sliderMeasured) {
        return <View style={styles.container} onLayout={onLayout} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.track}>
                <View style={[styles.selectedTrack, { left: positionFromValue(value1), right: sliderWidth.current - positionFromValue(value2) }]} />
                <View style={[styles.knob, { left: positionFromValue(value1) - 10 }]} {...panResponder1.panHandlers} />
                <View style={[styles.knob, { left: positionFromValue(value2) - 10 }]} {...panResponder2.panHandlers} />
            </View>
            <Text style={styles.values}>{`${value1.toFixed(1)} - ${value2.toFixed(1)}`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        justifyContent: 'center',
    },
    track: {
        height: 4,
        backgroundColor: '#ddd',
        borderRadius: 2,
    },
    selectedTrack: {
        height: 4,
        backgroundColor: '#007AFF',
        position: 'absolute',
    },
    knob: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#007AFF',
        position: 'absolute',
        top: -8,
    },
    values: {
        marginTop: 15,
        textAlign: 'center',
    },
});

export default DualSlider;
