import { Occurrence } from "@/types"
import { View } from "../Themed"
import { FlatList } from "react-native"
import { useCallback } from "react"
import { SingleOccurrenceItem } from "./SingleTransactionItem"
import { RecurrentOccurrenceItem } from "./RecurrentTransactionItem"

type Props = {
    occurrences: Occurrence[]
}

export const OccurrencesList: React.FC<Props> = ({ occurrences }) => {
    const renderItem = useCallback(({ item }: { item: Occurrence }) => (
        item.type === 'single' ? <SingleOccurrenceItem occurrence={item} /> : <RecurrentOccurrenceItem occurrence={item} />
    ), []);

    return (<View>
        <FlatList
            data={occurrences}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.when.getTime()}`}
        />
    </View>)
}