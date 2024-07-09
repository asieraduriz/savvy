import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  PanResponderGestureState,
  LayoutChangeEvent,
} from "react-native";

type RangeSliderProps = {
  min: number;
  max: number;
  step: number;
  onValuesChange: (values: [number, number]) => void;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step,
  onValuesChange,
}) => {
  const [lowerKnob, setLowerKnob] = useState(min);
  const [upperMark, setUpperMark] = useState(max);
  const sliderWidth = useRef(0);
  const [sliderMeasured, setSliderMeasured] = useState(false);

  const valueFromPosition = useCallback((position: number) => {
    const ratio = (position - 10) / (sliderWidth.current - 20);
    const value = min + ratio * (max - min);
    return Math.round(value / step) * step;
  }, [sliderWidth, min, max, step]);

  const updateValue = useCallback(
    (gestureState: PanResponderGestureState, isFirstKnob: boolean) => {
      const newValue = valueFromPosition(gestureState.moveX);
      if (isFirstKnob) {
        const updatedValue = Math.min(
          Math.max(newValue, min),
          upperMark - step
        );
        setLowerKnob(updatedValue);
        onValuesChange([updatedValue, upperMark]);
      } else {
        const updatedValue = Math.max(
          Math.min(newValue, max),
          lowerKnob + step
        );
        setUpperMark(updatedValue);
        onValuesChange([lowerKnob, updatedValue]);
      }
    },
    [lowerKnob, upperMark, min, max, step, onValuesChange, valueFromPosition]
  );

  const lowerKnobResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => updateValue(gestureState, true),
    })
  ).current;

  const upperKnobResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => updateValue(gestureState, false),
    })
  ).current;

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
        <View
          style={[
            styles.selectedTrack,
            {
              left: positionFromValue(lowerKnob),
              right: sliderWidth.current - positionFromValue(upperMark),
            },
          ]}
        />
        <View
          style={[styles.knob, { left: positionFromValue(lowerKnob) - 10 }]}
          {...lowerKnobResponder.panHandlers}
        />
        <View
          style={[styles.knob, { left: positionFromValue(upperMark) - 10 }]}
          {...upperKnobResponder.panHandlers}
        />
      </View>
      <Text style={styles.values}>{`${lowerKnob.toFixed(1)} - ${upperMark.toFixed(1)}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: "center",
  },
  track: {
    height: 4,
    backgroundColor: "#ddd",
    borderRadius: 2,
  },
  selectedTrack: {
    height: 4,
    backgroundColor: "#007AFF",
    position: "absolute",
  },
  knob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#007AFF",
    position: "absolute",
    top: -8,
  },
  values: {
    marginTop: 15,
    textAlign: "center",
  },
});
