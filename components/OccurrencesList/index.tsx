import { Occurrence } from "@/types"
import { Text, View } from "../Themed"
import { FlatList } from "react-native"
import { useCallback } from "react"
import { formatDate } from "date-fns"

type Props = {
    occurrences: Occurrence[]
}

export const OccurrencesList: React.FC<Props> = ({ occurrences }) => {
    const renderItem = useCallback(({ item }: { item: Occurrence }) => (
        <View><Text>
            {item.title} {item.type} {formatDate(item.when, "MMM do yyyy")}
        </Text>
        </View>
    ), []);

    return (<View>
        <FlatList
            data={occurrences}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.when.getTime()}`}
        />
    </View>)
}