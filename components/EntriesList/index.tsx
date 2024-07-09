import { GroupedEntry, Entry } from "@/types";
import { Text, View } from "../Themed";
import { FlatList } from "react-native";
import { OneTimeEntryItem } from "./OneTimeEntryItem";
import { SubscriptionEntryItem } from "./SubscriptionEntryItem";
import SearchBox from "../Filters/SearchBox";
import { useCallback, useMemo, useState } from "react";
import { Transformers } from "@/transformers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

type Props = {
  entries: Entry[];
};

const renderItem = ({ item }: { item: GroupedEntry }) => {
  return (
    <View>
      <Text>{Transformers.toFormattedDate(item.when)}</Text>
      {item.entries.map((entry) =>
        entry.type === "onetime" ? (
          <OneTimeEntryItem key={entry.id} entry={entry} />
        ) : (
          <SubscriptionEntryItem key={entry.id} entry={entry} />
        )
      )}
    </View>
  );
};

export const EntriesList: React.FC<Props> = ({ entries: entries }) => {
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>(entries);

  const entryTitles = useMemo(
    () => new Set(filteredEntries.map((o) => o.title)),
    [filteredEntries]
  );
  const entryCategories = useMemo(
    () => new Set(filteredEntries.map((o) => o.category)),
    [filteredEntries]
  );
  const groupedEntries = useMemo(
    () => Transformers.toGroupedByDateEntries(filteredEntries),
    [filteredEntries]
  );

  const onSearchBoxQueryChange = useCallback(
    (query: string) => {
      const filtered = entries.filter((t) =>
        t.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEntries(filtered);
    },
    [entries]
  );

  return (
    <View>
      <SearchBox
        onSearch={onSearchBoxQueryChange}
        terms={Array.from(entryTitles)}
      />
      <Link href="/filter">
        <MaterialCommunityIcons name="filter-variant" size={24} color="black" />
      </Link>
      <FlatList
        data={groupedEntries}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.when}`}
      />
    </View>
  );
};
