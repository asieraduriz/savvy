import { Screens } from "@/screens";
import { useLocalSearchParams } from "expo-router";

export default () => {
    const { id } = useLocalSearchParams<{ id: string }>();

    if (!id) throw new Error("No id in edit/goal/[id]");
    return <Screens.Edit.Goal id={id} />;
};
