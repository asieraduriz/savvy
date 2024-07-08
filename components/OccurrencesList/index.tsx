import { GroupedOccurrence, Occurrence } from "@/types";
import { Text, View } from "../Themed";
import { FlatList } from "react-native";
import { SingleOccurrenceItem } from "./SingleOccurrenceItem";
import { RecurrentOccurrenceItem } from "./RecurrentOccurrenceItem";
import SearchBox from "../Filters/SearchBox";
import { useCallback, useMemo, useState } from "react";
import { Transformers } from "@/transformers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

type Props = {
  occurrences: Occurrence[];
};

const renderItem = ({ item }: { item: GroupedOccurrence }) => {
  return (
    <View>
      <Text>{Transformers.toFormattedDate(item.when)}</Text>
      {item.occurrences.map((occurrence) =>
        occurrence.type === "single" ? (
          <SingleOccurrenceItem key={occurrence.id} occurrence={occurrence} />
        ) : (
          <RecurrentOccurrenceItem
            key={occurrence.id}
            occurrence={occurrence}
          />
        )
      )}
    </View>
  );
};

export const OccurrencesList: React.FC<Props> = ({ occurrences }) => {
  const [filteredOccurrences, setFilteredOccurrences] =
    useState<Occurrence[]>(occurrences);

  const occurrenceTitles = useMemo(
    () => new Set(filteredOccurrences.map((o) => o.title)),
    [filteredOccurrences]
  );
  const occurrenceCategories = useMemo(
    () => new Set(filteredOccurrences.map((o) => o.category)),
    [filteredOccurrences]
  );
  const groupedOccurrences = useMemo(
    () => Transformers.toGroupedByDateOccurences(filteredOccurrences),
    [filteredOccurrences]
  );

  const onSearchBoxQueryChange = useCallback(
    (query: string) => {
      const filtered = occurrences.filter((t) =>
        t.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredOccurrences(filtered);
    },
    [occurrences]
  );

  return (
    <View>
      <SearchBox
        onSearch={onSearchBoxQueryChange}
        terms={Array.from(occurrenceTitles)}
      />
      <Link href="/filter">
        <MaterialCommunityIcons name="filter-variant" size={24} color="black" />
      </Link>
      <FlatList
        data={groupedOccurrences}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.when}`}
      />
    </View>
  );
};
