import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export default function AttendanceScreen({ navigation }) {
  const { user } = useAuth();
  const { getAttendanceByEmployee } = useData();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock attendance data for demonstration
  const mockAttendanceData = [
    { date: '2024-08-12', checkIn: '09:00', checkOut: '17:30', status: 'present', hours: '8.5' },
    { date: '2024-08-11', checkIn: '09:15', checkOut: '17:45', status: 'late', hours: '8.5' },
    { date: '2024-08-10', checkIn: '09:00', checkOut: '17:30', status: 'present', hours: '8.5' },
    { date: '2024-08-09', checkIn: '09:00', checkOut: '17:30', status: 'present', hours: '8.5' },
    { date: '2024-08-08', checkIn: '09:00', checkOut: '17:30', status: 'present', hours: '8.5' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return '#34c759';
      case 'late': return '#ff9500';
      case 'absent': return '#ff3b30';
      case 'half-day': return '#007aff';
      default: return '#8e8e93';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderAttendanceItem = ({ item }) => (
    <View style={styles.attendanceItem}>
      <View style={styles.attendanceDate}>
        <Text style={styles.dateText}>{formatDate(item.date)}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.attendanceDetails}>
        <View style={styles.timeRow}>
          <Ionicons name="log-in" size={16} color="#34c759" />
          <Text style={styles.timeText}>{item.checkIn}</Text>
          <Ionicons name="log-out" size={16} color="#ff3b30" style={{ marginLeft: 16 }} />
          <Text style={styles.timeText}>{item.checkOut}</Text>
        </View>
        <Text style={styles.hoursText}>{item.hours} hours</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.periodSelector}>
          {['week', 'month'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.activePeriodButton
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period && styles.activePeriodButtonText
              ]}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate('AttendanceHistory')}
        >
          <Ionicons name="calendar" size={20} color="#007aff" />
          <Text style={styles.historyButtonText}>View Calendar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>This Week Summary</Text>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Present</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Absent</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1</Text>
              <Text style={styles.statLabel}>Late</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>42.5h</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.attendanceList}>
        <Text style={styles.sectionTitle}>Recent Attendance</Text>
        <FlatList
          data={mockAttendanceData}
          renderItem={renderAttendanceItem}
          keyExtractor={(item) => item.date}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 2,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  activePeriodButton: {
    backgroundColor: '#007aff',
  },
  periodButtonText: {
    color: '#8e8e93',
    fontSize: 14,
    fontWeight: '500',
  },
  activePeriodButtonText: {
    color: '#ffffff',
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyButtonText: {
    color: '#007aff',
    fontSize: 14,
    marginLeft: 4,
  },
  summary: {
    padding: 24,
  },
  summaryCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007aff',
  },
  statLabel: {
    fontSize: 12,
    color: '#8e8e93',
    marginTop: 4,
  },
  attendanceList: {
    flex: 1,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  attendanceItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  attendanceDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  attendanceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#8e8e93',
    marginLeft: 4,
  },
  hoursText: {
    fontSize: 14,
    color: '#007aff',
    fontWeight: '500',
  },
});