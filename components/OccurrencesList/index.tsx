import { GroupedOccurrence } from "@/types";
import { Text, View } from "../Themed";
import { FlatList } from "react-native";
import { SingleOccurrenceItem } from "./SingleOccurrenceItem";
import { RecurrentOccurrenceItem } from "./RecurrentOccurrenceItem";
import { format } from "date-fns";

type Props = {
    occurrences: GroupedOccurrence[];
};

export const OccurrencesList: React.FC<Props> = ({ occurrences }) => {
    const renderItem = ({ item }: { item: GroupedOccurrence }) => {
        return (
            <View>
                <Text>{format(new Date(item.when), "MMM do yyyy")}</Text>
                {item.occurrences.map((occurrence) =>
                    occurrence.type === "single" ? (
                        <SingleOccurrenceItem key={occurrence.id} occurrence={occurrence} />
                    ) : (
                        <RecurrentOccurrenceItem key={occurrence.id} occurrence={occurrence} />
                    )
                )}
            </View>
        );
    };

    return (
        <View>
            <FlatList data={occurrences} renderItem={renderItem} keyExtractor={(item) => `${item.when}`} />
        </View>
    );
};
