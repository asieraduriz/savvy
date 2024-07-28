import { Interval } from "@/types";
import { Picker } from "@react-native-picker/picker";
import { FC } from "react";

type Props = {
    interval: Interval;
    setInterval: (interval: Interval) => void;
};

const Item = (interval: Interval) => <Picker.Item key={interval} value={interval} label={interval} />;

export const IntervalPicker: FC<Props> = ({ interval, setInterval }) => (
    <Picker selectedValue={interval} onValueChange={setInterval}>
        {Object.values(Interval).map(Item)}
    </Picker>
);
