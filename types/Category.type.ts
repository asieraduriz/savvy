import { MaterialCommunityIcons } from "@expo/vector-icons";


export type Category = {
    name: string;
    iconName?: typeof MaterialCommunityIcons.defaultProps;
    color: string;
}