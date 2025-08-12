import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AttendanceHistoryScreen() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Mock calendar data
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const mockAttendanceStatus = {
    1: 'present', 2: 'present', 3: 'present', 4: 'present', 5: 'present',
    8: 'present', 9: 'late', 10: 'present', 11: 'present', 12: 'present',
    15: 'present', 16: 'present', 17: 'present', 18: 'present', 19: 'present',
    22: 'present', 23: 'present', 24: 'present', 25: 'present', 26: 'present',
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return '#34c759';
      case 'late': return '#ff9500';
      case 'absent': return '#ff3b30';
      case 'half-day': return '#007aff';
      default: return '#2a2a2a';
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.emptyDay} />);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const status = mockAttendanceStatus[day];
      const isWeekend = new Date(selectedYear, selectedMonth, day).getDay() % 6 === 0;
      
      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            { backgroundColor: isWeekend ? '#1a1a1a' : getStatusColor(status) }
          ]}
        >
          <Text style={[
            styles.dayText,
            { color: isWeekend ? '#8e8e93' : '#ffffff' }
          ]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }
    
    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.monthButton}
          onPress={() => setSelectedMonth(selectedMonth > 0 ? selectedMonth - 1 : 11)}
        >
          <Ionicons name="chevron-back" size={24} color="#007aff" />
        </TouchableOpacity>
        
        <Text style={styles.monthTitle}>
          {monthNames[selectedMonth]} {selectedYear}
        </Text>
        
        <TouchableOpacity
          style={styles.monthButton}
          onPress={() => setSelectedMonth(selectedMonth < 11 ? selectedMonth + 1 : 0)}
        >
          <Ionicons name="chevron-forward" size={24} color="#007aff" />
        </TouchableOpacity>
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#34c759' }]} />
          <Text style={styles.legendText}>Present</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#ff9500' }]} />
          <Text style={styles.legendText}>Late</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#ff3b30' }]} />
          <Text style={styles.legendText}>Absent</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#1a1a1a' }]} />
          <Text style={styles.legendText}>Weekend</Text>
        </View>
      </View>

      <View style={styles.calendar}>
        <View style={styles.weekDays}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <Text key={day} style={styles.weekDayText}>{day}</Text>
          ))}
        </View>
        
        <View style={styles.daysContainer}>
          {renderCalendar()}
        </View>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Monthly Summary</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>20</Text>
            <Text style={styles.summaryLabel}>Present</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>1</Text>
            <Text style={styles.summaryLabel}>Late</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>0</Text>
            <Text style={styles.summaryLabel}>Absent</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>95%</Text>
            <Text style={styles.summaryLabel}>Attendance</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  monthButton: {
    padding: 8,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#1a1a1a',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  legendItem: {
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#8e8e93',
  },
  calendar: {
    margin: 16,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekDayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8e8e93',
    textAlign: 'center',
    width: '14.28%',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    borderRadius: 4,
  },
  emptyDay: {
    width: '14.28%',
    aspectRatio: 1,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
  },
  summary: {
    margin: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007aff',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#8e8e93',
    marginTop: 4,
  },
});