// src/screens/TransactionListScreen.tsx
import React, { useState, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import SearchBox from './SearchBox';
import { Transaction } from '@/types';
import { Text, View } from '../Themed';
import { TransactionItem } from './Item';

export const TransactionList: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  const titles = useMemo(() => transactions.map(t => t.title), [transactions]);

  const handleSearch = useCallback((query: string) => {
    const filtered = transactions.filter(t =>
      t.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTransactions(filtered);
  }, [transactions]);

  const renderItem = useCallback(({ item }: { item: Transaction }) => (
    <TransactionItem transaction={item} />
  ), []);

  return (
    <View style={styles.container}>
      <SearchBox titles={titles} onSearch={handleSearch} />
      <FlatList
        data={filteredTransactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  transactionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
