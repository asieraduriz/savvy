import React, { useState } from 'react';
import { View, Pressable, Text, StyleSheet, Modal } from 'react-native';
import { Pickers } from '../Pickers';

type FilterOptions = {
    dateRange: 'all' | 'today' | 'week' | 'month' | 'custom';
    start: Date;
    end: Date;
}

type Props = {
    onFilterChange: (filters: FilterOptions) => void;
}

export const Filters: React.FC<Props> = ({ onFilterChange }) => {
    const [expanded, setExpanded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [filters, setFilters] = useState<FilterOptions>({
        dateRange: 'all',
        start: new Date(),
        end: new Date(),
    });

    const applyFilters = (newFilters: Partial<FilterOptions>) => {
        const updatedFilters = { ...filters, ...newFilters };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.mainButton} onPress={() => setExpanded(!expanded)}>
                <Text>Filters</Text>
            </Pressable>

            {expanded && (
                <View style={styles.expandedFilters}>
                    <Pressable style={styles.filterButton} onPress={() => applyFilters({ dateRange: 'today' })}>
                        <Text>Today</Text>
                    </Pressable>
                    <Pressable style={styles.filterButton} onPress={() => applyFilters({ dateRange: 'week' })}>
                        <Text>This Week</Text>
                    </Pressable>
                    <Pressable style={styles.filterButton} onPress={() => applyFilters({ dateRange: 'month' })}>
                        <Text>This Month</Text>
                    </Pressable>
                    <Pressable style={styles.filterButton} onPress={() => applyFilters({ dateRange: 'all' })}>
                        <Text>All time</Text>
                    </Pressable>
                    <Pressable style={styles.filterButton} onPress={() => setModalVisible(true)}>
                        <Text>More Filters</Text>
                    </Pressable>
                </View>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Advanced Filters</Text>
                    <Pickers.DateRange
                        start={filters.start}
                        end={filters.end}
                        onStartChange={(start) => applyFilters({ start })}
                        onEndChange={(end) => applyFilters({ end })}
                    />
                    <Pressable
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text>Close</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    mainButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    expandedFilters: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    filterButton: {
        padding: 5,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 800
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    closeButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
    },
});