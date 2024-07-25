import { TextInput, View } from '@/components/Themed';
import React, { useState } from 'react';
import { SafeAreaView, Button, FlatList, Text, StyleSheet, ListRenderItem } from 'react-native';

interface Expense {
  id: string;
  name: string;
  cost: number;
  date: string;
}

export default () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', name: 'Groceries', cost: 50, date: '2023-07-25' },
    { id: '2', name: 'Gas', cost: 30, date: '2024-07-24' },
    { id: '3', name: 'Groceries', cost: 50, date: '2023-07-25' },
    { id: '4', name: 'Gas', cost: 30, date: '2024-07-24' },
    { id: '5', name: 'Groceries', cost: 50, date: '2023-07-25' },
    { id: '6', name: 'Gas', cost: 30, date: '2024-07-24' },
    { id: '1', name: 'Groceries', cost: 50, date: '2023-07-25' },
    { id: '2', name: 'Gas', cost: 30, date: '2024-07-24' },
    { id: '3', name: 'Groceries', cost: 50, date: '2023-07-25' },
    { id: '4', name: 'Gas', cost: 30, date: '2024-07-24' },
    { id: '5', name: 'Groceries', cost: 50, date: '2023-07-25' },
    { id: '6', name: 'Gas', cost: 30, date: '2024-07-24' },
    { id: '1', name: 'Groceries', cost: 50, date: '2023-07-25' },
    { id: '2', name: 'Gas', cost: 30, date: '2024-07-24' },
    { id: '3', name: 'Groceries', cost: 50, date: '2023-07-25' },
    { id: '4', name: 'Gas', cost: 30, date: '2024-07-24' },
    { id: '5', name: 'Groceries', cost: 50, date: '2023-07-25' },
    { id: '6', name: 'Gas', cost: 30, date: '2024-07-24' },
    // Add more items as needed
  ]);

  const renderExpenseItem: ListRenderItem<Expense> = ({ item }) => (
    <View style={styles.expenseItem}>
      <Text>{item.name}</Text>
      <Text>${item.cost.toFixed(2)}</Text>
      <Text>{item.date}</Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search expenses"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Expense" onPress={() => {/* Add expense logic */ }} />
        <Button title="Filter" onPress={() => {/* Filter logic */ }} />
      </View>
    </View>
  );

  const handleAddExpense = () => {
    // Implement add expense logic
  };

  const handleFilter = () => {
    // Implement filter logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item: Expense) => item.id}
        ListHeaderComponent={renderHeader}
        stickyHeaderIndices={[0]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  header: {
    backgroundColor: 'white',
    padding: 10,
  },
  searchBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
