// src/features/search/components/SearchBox.tsx
import { useSearchTrie } from '@/hooks/useSearchTrie';
import React, { useState, useCallback, useMemo } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
    titles: string[];
    onSearch: (query: string) => void;
}

const SearchBox: React.FC<Props> = ({ titles, onSearch }) => {
    const [query, setQuery] = useState('');
    const { search } = useSearchTrie(titles);

    const suggestions = useMemo(() => {
        if (query.length > 1) {
            const matches = search(query);
            return matches.slice(0, 5);
        }
        return [];
    }, [query, search]);

    const handleQueryChange = useCallback((text: string) => {
        setQuery(text);
        onSearch(text);
    }, [onSearch]);

    const handleSuggestionPress = useCallback((suggestion: string) => {
        setQuery(suggestion);
        onSearch(suggestion);
    }, [onSearch]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={query}
                onChangeText={handleQueryChange}
                placeholder="Search transactions..."
            />
            {suggestions.length > 0 && (
                <FlatList
                    data={suggestions}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.suggestionItem}
                            onPress={() => handleSuggestionPress(item)}
                        >
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.suggestionList}
                    keyboardShouldPersistTaps="always"
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    suggestionList: {
        maxHeight: 200,
        borderColor: 'gray',
        borderWidth: 1,
        borderTopWidth: 0,
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});

export default SearchBox;