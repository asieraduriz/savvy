import React, { useState, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import SearchBox from './SearchBox';
import { Transaction } from '@/types';
import { View } from '../Themed';
import { TransactionItem } from './Item';
import { Filters } from './Filters';

export const TransactionsList: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  const titles = useMemo(() => transactions.map(t => t.title), [transactions]);

  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = useCallback((query: string) => {
    const filtered = transactions.filter(t =>
      t.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTransactions(filtered);
    setSearchQuery(query);
  }, [transactions]);

  const renderItem = useCallback(({ item }: { item: Transaction }) => (
    <TransactionItem transaction={item} />
  ), []);

  const [filters, setFilters] = useState({
    dateRange: 'all',
  });

  const applyFilters = useCallback(() => {
    let filtered = transactions.filter(t =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filters.dateRange !== 'all') {
      const now = new Date();
      switch (filters.dateRange) {
        case 'today':
          filtered = filtered.filter(t => t.created.toDateString() === now.toDateString());
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(t => t.created >= weekAgo);
          break;
        case 'month':
          const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          filtered = filtered.filter(t => t.created >= monthAgo);
          break;
      }
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchQuery, filters]);

  const handleFilterChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
  }, []);

  // Apply filters when search query or filters change
  React.useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <View style={styles.container}>
      <SearchBox titles={titles} onSearch={handleSearch} />
      <Filters onFilterChange={handleFilterChange} />
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
