import { MaterialCommunityIcons } from "@expo/vector-icons";

export type Category = {
    id: string;
    name: string;
    iconName?: typeof MaterialCommunityIcons.defaultProps;
    color: string;
}